<?php
/**
 * Plugin Name: Oredy Témoignages
 * Description: Réception, modération et exposition des témoignages clients (avec note et photo) via l'API REST pour le site React oredytech.com.
 * Version: 1.0.0
 * Author: Oredy MUSANDA
 * Text Domain: oredy-testimonials
 */

if (!defined('ABSPATH')) {
    exit;
}

define('OREDY_T_CPT', 'oredy_testimonial');
define('OREDY_T_NS', 'oredy/v1');

/* -------------------------------------------------------------------------
 * 1. Custom Post Type
 * ---------------------------------------------------------------------- */
add_action('init', function () {
    register_post_type(OREDY_T_CPT, array(
        'labels' => array(
            'name'               => 'Témoignages',
            'singular_name'      => 'Témoignage',
            'menu_name'          => 'Témoignages',
            'add_new_item'       => 'Ajouter un témoignage',
            'edit_item'          => 'Modifier le témoignage',
            'all_items'          => 'Tous les témoignages',
        ),
        'public'        => false,
        'show_ui'       => true,
        'menu_icon'     => 'dashicons-format-quote',
        'supports'      => array('title', 'editor', 'thumbnail'),
        'capability_type' => 'post',
    ));
});

/* -------------------------------------------------------------------------
 * 2. Champs de modération (note, société, statut)
 * ---------------------------------------------------------------------- */
add_action('add_meta_boxes', function () {
    add_meta_box('oredy_t_meta', 'Détails du témoignage', function ($post) {
        $rating   = get_post_meta($post->ID, '_oredy_rating', true);
        $company  = get_post_meta($post->ID, '_oredy_company', true);
        $email    = get_post_meta($post->ID, '_oredy_email', true);
        $approved = get_post_meta($post->ID, '_oredy_approved', true);
        wp_nonce_field('oredy_t_save', 'oredy_t_nonce');
        echo '<p><label><strong>Nom affiché :</strong> utilisez le titre de l\'article ci-dessus.</label></p>';
        echo '<p><label><strong>Entreprise / Organisation</strong><br><input type="text" style="width:100%" name="oredy_company" value="' . esc_attr($company) . '"></label></p>';
        echo '<p><label><strong>Note (1 à 5)</strong><br><input type="number" min="1" max="5" name="oredy_rating" value="' . esc_attr($rating ? $rating : 5) . '"></label></p>';
        echo '<p><label><strong>Email (privé)</strong><br><input type="email" style="width:100%" name="oredy_email" value="' . esc_attr($email) . '"></label></p>';
        echo '<p><label><input type="checkbox" name="oredy_approved" value="1" ' . checked($approved, '1', false) . '> <strong>Approuver et publier sur le site</strong></label></p>';
        echo '<p>La photo/logo est la <em>image mise en avant</em> du témoignage.</p>';
    }, OREDY_T_CPT, 'normal', 'high');
});

add_action('save_post_' . OREDY_T_CPT, function ($post_id) {
    if (!isset($_POST['oredy_t_nonce']) || !wp_verify_nonce($_POST['oredy_t_nonce'], 'oredy_t_save')) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    update_post_meta($post_id, '_oredy_company', sanitize_text_field($_POST['oredy_company'] ?? ''));
    update_post_meta($post_id, '_oredy_email', sanitize_email($_POST['oredy_email'] ?? ''));
    $rating = intval($_POST['oredy_rating'] ?? 5);
    update_post_meta($post_id, '_oredy_rating', max(1, min(5, $rating)));
    update_post_meta($post_id, '_oredy_approved', isset($_POST['oredy_approved']) ? '1' : '0');
});

/* Colonne "Approuvé" dans la liste d'admin */
add_filter('manage_' . OREDY_T_CPT . '_posts_columns', function ($cols) {
    $cols['oredy_rating']   = 'Note';
    $cols['oredy_approved'] = 'Approuvé';
    return $cols;
});
add_action('manage_' . OREDY_T_CPT . '_posts_custom_column', function ($col, $post_id) {
    if ($col === 'oredy_rating') {
        echo esc_html(get_post_meta($post_id, '_oredy_rating', true)) . ' / 5';
    }
    if ($col === 'oredy_approved') {
        echo get_post_meta($post_id, '_oredy_approved', true) === '1' ? '✅ Oui' : '⏳ En attente';
    }
}, 10, 2);

/* -------------------------------------------------------------------------
 * 3. API REST
 * ---------------------------------------------------------------------- */
add_action('rest_api_init', function () {

    // Lecture publique des témoignages approuvés
    register_rest_route(OREDY_T_NS, '/testimonials', array(
        'methods'             => 'GET',
        'permission_callback' => '__return_true',
        'callback'            => function (WP_REST_Request $req) {
            $per_page = min(50, max(1, intval($req->get_param('per_page') ?: 20)));
            $query = new WP_Query(array(
                'post_type'      => OREDY_T_CPT,
                'post_status'    => 'publish',
                'posts_per_page' => $per_page,
                'meta_query'     => array(
                    array('key' => '_oredy_approved', 'value' => '1'),
                ),
            ));
            $out = array();
            foreach ($query->posts as $p) {
                $out[] = array(
                    'id'        => $p->ID,
                    'name'      => get_the_title($p),
                    'company'   => get_post_meta($p->ID, '_oredy_company', true),
                    'message'   => wp_strip_all_tags($p->post_content),
                    'rating'    => intval(get_post_meta($p->ID, '_oredy_rating', true)),
                    'avatarUrl' => get_the_post_thumbnail_url($p->ID, 'medium') ?: null,
                    'date'      => $p->post_date_gmt,
                );
            }
            return rest_ensure_response($out);
        },
    ));

    // Soumission publique d'un témoignage (multipart/form-data ou JSON)
    register_rest_route(OREDY_T_NS, '/testimonials', array(
        'methods'             => 'POST',
        'permission_callback' => '__return_true',
        'callback'            => 'oredy_t_submit',
    ));
});

function oredy_t_submit(WP_REST_Request $req) {
    $name    = sanitize_text_field($req->get_param('name'));
    $company = sanitize_text_field($req->get_param('company'));
    $email   = sanitize_email($req->get_param('email'));
    $message = wp_kses_post($req->get_param('message'));
    $rating  = max(1, min(5, intval($req->get_param('rating'))));

    if (empty($name) || empty($message)) {
        return new WP_Error('oredy_invalid', 'Le nom et le message sont obligatoires.', array('status' => 400));
    }
    if (mb_strlen($name) > 100 || mb_strlen($message) > 2000) {
        return new WP_Error('oredy_invalid', 'Nom (100) ou message (2000) trop long.', array('status' => 400));
    }

    // Anti-spam simple : 1 soumission / 2 minutes par IP
    $ip  = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = 'oredy_t_' . md5($ip);
    if (get_transient($key)) {
        return new WP_Error('oredy_rate_limit', 'Merci de patienter avant un nouvel envoi.', array('status' => 429));
    }
    set_transient($key, 1, 120);

    $post_id = wp_insert_post(array(
        'post_type'    => OREDY_T_CPT,
        'post_title'   => $name,
        'post_content' => $message,
        'post_status'  => 'publish', // visible en admin, mais non approuvé
    ), true);

    if (is_wp_error($post_id)) {
        return $post_id;
    }

    update_post_meta($post_id, '_oredy_company', $company);
    update_post_meta($post_id, '_oredy_email', $email);
    update_post_meta($post_id, '_oredy_rating', $rating);
    update_post_meta($post_id, '_oredy_approved', '0');

    // Image / logo facultatif
    if (!empty($_FILES['image']['tmp_name'])) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';

        $file = $_FILES['image'];
        $allowed = array('image/jpeg', 'image/png', 'image/webp', 'image/gif');
        $type = mime_content_type($file['tmp_name']);
        if (in_array($type, $allowed, true) && $file['size'] <= 3 * 1024 * 1024) {
            $attachment_id = media_handle_sideload(array(
                'name'     => sanitize_file_name($file['name']),
                'tmp_name' => $file['tmp_name'],
            ), $post_id);
            if (!is_wp_error($attachment_id)) {
                set_post_thumbnail($post_id, $attachment_id);
            }
        }
    }

    // Notification e-mail à l'administrateur
    wp_mail(
        get_option('admin_email'),
        'Nouveau témoignage à valider : ' . $name,
        "Un nouveau témoignage a été reçu.\n\nNom : $name\nEntreprise : $company\nNote : $rating/5\n\n$message\n\nValidez-le ici : " . admin_url('post.php?post=' . $post_id . '&action=edit')
    );

    return rest_ensure_response(array(
        'success' => true,
        'id'      => $post_id,
        'message' => 'Témoignage reçu, il sera publié après validation.',
    ));
}

/* -------------------------------------------------------------------------
 * 4. CORS pour le front React
 * ---------------------------------------------------------------------- */
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Accept');
        return $value;
    });
}, 15);
