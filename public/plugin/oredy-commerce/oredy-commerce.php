<?php
/**
 * Plugin Name: Oredy Commerce — Marché & Boutique
 * Description: Gestion des sites web, produits directs et affiliés pour le site Oredy et son API REST publique.
 * Version: 1.0.0
 * Author: Oredy Technologies
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */
if (!defined('ABSPATH')) exit;

function oredy_commerce_register() {
    foreach (array('oredy_site' => array('Sites du marché', 'Site'), 'oredy_product' => array('Produits boutique', 'Produit'), 'oredy_purchase' => array("Demandes d'achat", 'Demande')) as $type => $labels) {
        register_post_type($type, array(
            'labels' => array('name' => $labels[0], 'singular_name' => $labels[1], 'add_new_item' => 'Ajouter : ' . $labels[1], 'edit_item' => 'Modifier : ' . $labels[1]),
            'public' => false, 'show_ui' => true, 'show_in_menu' => 'oredy-commerce',
            'supports' => $type === 'oredy_purchase' ? array('title') : array('title', 'editor', 'excerpt', 'thumbnail'),
            'capability_type' => 'post', 'capabilities' => array('edit_posts' => 'manage_options', 'edit_others_posts' => 'manage_options', 'publish_posts' => 'manage_options', 'read_private_posts' => 'manage_options', 'delete_posts' => 'manage_options', 'delete_others_posts' => 'manage_options', 'edit_published_posts' => 'manage_options', 'delete_published_posts' => 'manage_options', 'create_posts' => $type === 'oredy_purchase' ? 'do_not_allow' : 'manage_options'),
            'map_meta_cap' => true,
        ));
    }
    add_post_type_support('oredy_site', 'thumbnail');
    add_post_type_support('oredy_product', 'thumbnail');
}
add_action('init', 'oredy_commerce_register');
add_action('admin_menu', function() {
    add_menu_page('Oredy Commerce', 'Oredy Commerce', 'manage_options', 'oredy-commerce', 'oredy_commerce_home', 'dashicons-store', 26);
});
function oredy_commerce_home() {
    if (!current_user_can('manage_options')) return;
    echo '<div class="wrap"><h1>Oredy Commerce</h1><p>Ajoutez vos sites et produits, puis publiez-les pour les afficher sur le site. Les brouillons restent privés.</p>';
    foreach (array('oredy_site' => 'Ajouter un site', 'oredy_product' => 'Ajouter un produit') as $type => $label) echo '<p><a class="button button-primary" href="' . esc_url(admin_url('post-new.php?post_type=' . $type)) . '">' . esc_html($label) . '</a></p>';
    echo '<h2>Demandes et paiements</h2><p>Une demande reçue réserve le site (En cours d’achat). Confirmez la vente ou remettez-le disponible dans sa fiche après vérification du paiement. Aucun paiement n’est confirmé automatiquement.</p><p>Pour un paiement externe, renseignez le lien d’achat du site (Lygos ou autre page de paiement).</p><h2>API publique</h2>';
    foreach (array('sites', 'products') as $endpoint) echo '<p><code>' . esc_html(rest_url('oredy-commerce/v1/' . $endpoint)) . '</code></p>';
    echo '<p>Les notifications de demandes arrivent à oredymusanda@gmail.com. Les informations personnelles ne sont jamais exposées par ces endpoints.</p></div>';
}
function oredy_commerce_fields($type) {
    $common = array('price' => array('Prix', 'number'), 'currency' => array('Devise (USD, EUR, CDF…)', 'text'));
    if ($type === 'oredy_site') return array_merge($common, array(
        'status' => array('Disponibilité', 'select'), 'site_url' => array('Lien du site', 'url'), 'demo_url' => array('Lien de démonstration', 'url'),
        'purchase_url' => array('Lien de paiement / achat externe (facultatif)', 'url'), 'screenshots' => array('Captures : une URL par ligne', 'textarea'),
        'technologies' => array('Technologies séparées par des virgules', 'text'), 'code_snippets' => array('Extraits de code (texte uniquement)', 'textarea'),
    ));
    return array_merge($common, array('original_price' => array('Ancien prix (facultatif)', 'number'), 'category' => array('Catégorie', 'text'), 'image_url' => array('URL image (ou utilisez l’image mise en avant)', 'url'), 'product_url' => array('Lien du produit / commande directe', 'url'), 'is_affiliate' => array('Produit en affiliation', 'checkbox'), 'affiliate_url' => array('Lien d’affiliation', 'url'), 'commission_rate' => array('Commission en % (privée)', 'number'), 'is_featured' => array('Mis en avant', 'checkbox'), 'is_active' => array('Actif dans la boutique', 'checkbox')));
}
add_action('add_meta_boxes', function() {
    foreach (array('oredy_site', 'oredy_product') as $type) add_meta_box('oredy-commerce-fields', 'Prix, liens et disponibilité', 'oredy_commerce_box', $type, 'normal', 'high');
    add_meta_box('oredy-purchase-info', 'Informations de la demande', 'oredy_commerce_purchase_box', 'oredy_purchase', 'normal', 'high');
});
function oredy_commerce_box($post) {
    wp_nonce_field('oredy_commerce_save', 'oredy_commerce_nonce');
    foreach (oredy_commerce_fields($post->post_type) as $key => $field) {
        $value = get_post_meta($post->ID, '_oc_' . $key, true);
        if ($value === '' && $key === 'currency') $value = 'EUR';
        if ($value === '' && $key === 'status') $value = 'available';
        if ($key === 'is_active' && !metadata_exists('post', $post->ID, '_oc_is_active')) $value = '1';
        $name = 'oc_' . $key;
        echo '<p><label for="' . esc_attr($name) . '"><strong>' . esc_html($field[0]) . '</strong></label><br>';
        if ($field[1] === 'textarea') echo '<textarea class="widefat" rows="4" id="' . esc_attr($name) . '" name="' . esc_attr($name) . '">' . esc_textarea($value) . '</textarea>';
        elseif ($field[1] === 'select') {
            echo '<select id="' . esc_attr($name) . '" name="' . esc_attr($name) . '">';
            foreach (array('available' => 'Disponible', 'pending' => 'En cours d’achat', 'sold' => 'Vendu') as $v => $label) echo '<option value="' . esc_attr($v) . '" ' . selected($value, $v, false) . '>' . esc_html($label) . '</option>';
            echo '</select>';
        } elseif ($field[1] === 'checkbox') echo '<input type="checkbox" id="' . esc_attr($name) . '" name="' . esc_attr($name) . '" value="1" ' . checked($value, '1', false) . '>';
        else echo '<input class="widefat" type="' . esc_attr($field[1]) . '" id="' . esc_attr($name) . '" name="' . esc_attr($name) . '" value="' . esc_attr($value) . '" ' . ($field[1] === 'number' ? 'min="0" step="0.01" ' : '') . ($key === 'price' ? 'required ' : '') . '>';
        echo '</p>';
    }
    echo '<p>Le titre, la description complète, l’extrait et l’image mise en avant se renseignent dans les champs WordPress habituels. Pour un produit affilié, renseignez le lien d’affiliation ; pour un produit direct, renseignez son lien de commande.</p>';
}
function oredy_commerce_url($value) {
    $url = esc_url_raw($value, array('http', 'https'));
    return preg_match('#^https?://#i', $url) ? $url : '';
}
add_action('save_post', function($id, $post) {
    if (!in_array($post->post_type, array('oredy_site', 'oredy_product'), true) || wp_is_post_revision($id) || (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)) return;
    if (!current_user_can('manage_options') || !current_user_can('edit_post', $id) || !isset($_POST['oredy_commerce_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['oredy_commerce_nonce'])), 'oredy_commerce_save')) return;
    foreach (oredy_commerce_fields($post->post_type) as $key => $field) {
        $raw = isset($_POST['oc_' . $key]) ? wp_unslash($_POST['oc_' . $key]) : '';
        if (!is_scalar($raw)) $raw = '';
        if ($field[1] === 'url') $value = oredy_commerce_url($raw);
        elseif ($field[1] === 'checkbox') $value = $raw === '1' ? '1' : '0';
        elseif ($field[1] === 'number') $value = $raw === '' ? '' : max(0, (float) $raw);
        elseif ($key === 'status') $value = in_array($raw, array('available', 'pending', 'sold'), true) ? $raw : 'available';
        elseif ($key === 'currency') $value = strtoupper(substr(sanitize_text_field($raw ?: 'EUR'), 0, 8));
        elseif ($key === 'screenshots') $value = implode("\n", array_filter(array_map('oredy_commerce_url', preg_split('/[\r\n]+/', $raw))));
        elseif ($field[1] === 'textarea') $value = sanitize_textarea_field($raw);
        else $value = sanitize_text_field($raw);
        update_post_meta($id, '_oc_' . $key, $value);
    }
    $invalid = get_post_meta($id, '_oc_price', true) === '';
    if ($post->post_type === 'oredy_product') {
        $affiliate = get_post_meta($id, '_oc_is_affiliate', true) === '1';
        $invalid = $invalid || !get_post_meta($id, $affiliate ? '_oc_affiliate_url' : '_oc_product_url', true);
    }
    if ($invalid && $post->post_status === 'publish') {
        wp_update_post(array('ID' => $id, 'post_status' => 'draft'));
        set_transient('oredy_commerce_error_' . get_current_user_id(), 'Publication refusée : renseignez le prix et, pour un produit, son lien de commande ou d’affiliation.', 60);
    }
}, 10, 2);
add_action('admin_notices', function() {
    $key = 'oredy_commerce_error_' . get_current_user_id(); $message = get_transient($key);
    if ($message) { delete_transient($key); echo '<div class="notice notice-error"><p>' . esc_html($message) . '</p></div>'; }
});
function oredy_commerce_meta($id, $key, $default = '') {
    $value = get_post_meta($id, '_oc_' . $key, true);
    return $value === '' ? $default : $value;
}
function oredy_commerce_item($post) {
    $id = $post->ID;
    $result = array('id' => (string) $id, 'title' => $post->post_title, 'description' => wp_strip_all_tags($post->post_content), 'short_description' => wp_strip_all_tags($post->post_excerpt));
    $currency = oredy_commerce_meta($id, 'currency', 'EUR');
    if ($post->post_type === 'oredy_site') {
        $shots = array_filter(preg_split('/[\r\n]+/', oredy_commerce_meta($id, 'screenshots')));
        $image = get_the_post_thumbnail_url($id, 'large');
        if ($image) array_unshift($shots, $image);
        return array_merge($result, array('price' => (float) oredy_commerce_meta($id, 'price', 0), 'currency' => $currency, 'status' => oredy_commerce_meta($id, 'status', 'available'), 'screenshots' => array_values(array_unique($shots)), 'technologies' => array_values(array_filter(array_map('trim', explode(',', oredy_commerce_meta($id, 'technologies'))))), 'code_snippets' => oredy_commerce_meta($id, 'code_snippets'), 'site_url' => oredy_commerce_meta($id, 'site_url'), 'demo_url' => oredy_commerce_meta($id, 'demo_url'), 'purchase_url' => oredy_commerce_meta($id, 'purchase_url')));
    }
    $original = oredy_commerce_meta($id, 'original_price');
    return array_merge($result, array('price' => number_format((float) oredy_commerce_meta($id, 'price', 0), 2, ',', ' ') . ' ' . $currency, 'original_price' => $original === '' ? '' : number_format((float) $original, 2, ',', ' ') . ' ' . $currency, 'image_url' => get_the_post_thumbnail_url($id, 'large') ?: oredy_commerce_meta($id, 'image_url'), 'category' => oredy_commerce_meta($id, 'category'), 'product_url' => oredy_commerce_meta($id, 'product_url'), 'affiliate_url' => oredy_commerce_meta($id, 'affiliate_url'), 'is_affiliate' => oredy_commerce_meta($id, 'is_affiliate', '0') === '1', 'is_featured' => oredy_commerce_meta($id, 'is_featured', '0') === '1', 'is_active' => oredy_commerce_meta($id, 'is_active', '1') === '1'));
}
function oredy_commerce_catalog($request) {
    $type = strpos($request->get_route(), '/products') !== false ? 'oredy_product' : 'oredy_site';
    $args = array('post_type' => $type, 'post_status' => 'publish', 'posts_per_page' => $request['per_page'], 'paged' => $request['page'], 'orderby' => 'date', 'order' => 'DESC');
    if ($type === 'oredy_product') $args['meta_query'] = array('relation' => 'OR', array('key' => '_oc_is_active', 'value' => '1'), array('key' => '_oc_is_active', 'compare' => 'NOT EXISTS'));
    else $args['meta_query'] = array('relation' => 'OR', array('key' => '_oc_status', 'value' => array('available', 'pending'), 'compare' => 'IN'), array('key' => '_oc_status', 'compare' => 'NOT EXISTS'));
    $query = new WP_Query($args);
    $response = new WP_REST_Response(array_map('oredy_commerce_item', $query->posts));
    $response->header('X-WP-Total', $query->found_posts); $response->header('X-WP-TotalPages', max(1, $query->max_num_pages));
    return $response;
}
add_action('rest_api_init', function() {
    foreach (array('sites', 'products') as $route) register_rest_route('oredy-commerce/v1', '/' . $route, array('methods' => 'GET', 'permission_callback' => '__return_true', 'callback' => 'oredy_commerce_catalog', 'args' => array('per_page' => array('default' => 20, 'sanitize_callback' => 'absint', 'validate_callback' => function($v) { return is_numeric($v) && $v >= 1 && $v <= 100; }), 'page' => array('default' => 1, 'sanitize_callback' => 'absint', 'validate_callback' => function($v) { return is_numeric($v) && $v >= 1; }))));
    register_rest_route('oredy-commerce/v1', '/sites/(?P<id>\d+)', array('methods' => 'GET', 'permission_callback' => '__return_true', 'callback' => function($request) {
        $post = get_post((int) $request['id']);
        if (!$post || $post->post_type !== 'oredy_site' || $post->post_status !== 'publish') return new WP_Error('not_found', 'Site non trouvé.', array('status' => 404));
        return oredy_commerce_item($post);
    }));
    register_rest_route('oredy-commerce/v1', '/purchases', array('methods' => 'POST', 'permission_callback' => '__return_true', 'callback' => 'oredy_commerce_purchase', 'args' => array(
        'site_id' => array('required' => true, 'validate_callback' => function($v) { return is_numeric($v) && $v > 0 && (int) $v == $v; }),
        'buyer_name' => array('required' => true, 'validate_callback' => function($v) { return is_string($v) && strlen(trim($v)) >= 2 && strlen($v) <= 100; }),
        'buyer_email' => array('required' => true, 'validate_callback' => function($v) { return is_string($v) && strlen($v) <= 255 && is_email($v); }),
        'buyer_phone' => array('required' => true, 'validate_callback' => function($v) { return is_string($v) && preg_match('/^\+?[0-9 ()-]{10,20}$/', $v); }),
    )));
});
function oredy_commerce_purchase($request) {
    $id = (int) $request['site_id'];
    // Unique option insert prevents two concurrent reservations of one site.
    $lock = 'oredy_commerce_lock_' . $id;
    if (!add_option($lock, time(), '', false)) return new WP_Error('locked', 'Une demande est déjà en cours. Réessayez plus tard.', array('status' => 409));
    try {
        $post = get_post($id);
        if (!$post || $post->post_type !== 'oredy_site' || $post->post_status !== 'publish' || oredy_commerce_meta($id, 'status', 'available') !== 'available') return new WP_Error('unavailable', 'Ce site n’est plus disponible.', array('status' => 409));
        $name = sanitize_text_field($request['buyer_name']); $email = sanitize_email($request['buyer_email']); $phone = sanitize_text_field($request['buyer_phone']);
        $reference = 'OC-' . strtoupper(wp_generate_password(10, false, false));
        $purchase = wp_insert_post(array('post_type' => 'oredy_purchase', 'post_status' => 'private', 'post_title' => $reference . ' — ' . $post->post_title), true);
        if (is_wp_error($purchase)) return $purchase;
        foreach (array('site_id' => $id, 'buyer_name' => $name, 'buyer_email' => $email, 'buyer_phone' => $phone, 'reference' => $reference, 'amount' => oredy_commerce_meta($id, 'price', 0), 'currency' => oredy_commerce_meta($id, 'currency', 'EUR')) as $key => $value) update_post_meta($purchase, '_oc_' . $key, $value);
        $updated = update_post_meta($id, '_oc_status', 'pending');
        if (!$updated) { wp_delete_post($purchase, true); return new WP_Error('save_failed', 'Impossible de réserver ce site. Réessayez.', array('status' => 500)); }
        $sent = wp_mail('oredymusanda@gmail.com', 'Demande d’achat ' . $reference, "Site : {$post->post_title}\nRéférence : {$reference}\nNom : {$name}\nEmail : {$email}\nTéléphone : {$phone}\n" . admin_url('post.php?post=' . $purchase . '&action=edit'));
        update_post_meta($purchase, '_oc_email_sent', $sent ? '1' : '0');
        return new WP_REST_Response(array('reference' => $reference, 'message' => 'Votre demande a été enregistrée. Le site est en cours d’achat.'), 201);
    } finally { delete_option($lock); }
}
function oredy_commerce_purchase_box($post) {
    if (!current_user_can('manage_options')) return;
    foreach (array('reference' => 'Référence', 'buyer_name' => 'Nom', 'buyer_email' => 'Email', 'buyer_phone' => 'Téléphone', 'amount' => 'Montant', 'currency' => 'Devise') as $key => $label) echo '<p><strong>' . esc_html($label) . ' :</strong> ' . esc_html(oredy_commerce_meta($post->ID, $key)) . '</p>';
    echo '<p>Notification email : ' . (oredy_commerce_meta($post->ID, 'email_sent') === '1' ? 'envoyée' : 'échec — configurez l’envoi email WordPress') . '</p>';
    $site = (int) oredy_commerce_meta($post->ID, 'site_id');
    echo '<a class="button button-primary" href="' . esc_url(admin_url('post.php?post=' . $site . '&action=edit')) . '">Ouvrir le site : confirmer la vente ou remettre disponible</a>';
}
foreach (array('oredy_site', 'oredy_product') as $type) {
    add_filter('manage_' . $type . '_posts_columns', function($columns) { $columns['oc_price'] = 'Prix'; $columns['oc_status'] = 'Disponibilité'; return $columns; });
    add_action('manage_' . $type . '_posts_custom_column', function($column, $id) {
        if ($column === 'oc_price') echo esc_html(oredy_commerce_meta($id, 'price') . ' ' . oredy_commerce_meta($id, 'currency', 'EUR'));
        if ($column === 'oc_status') {
            if (get_post_type($id) === 'oredy_product') echo oredy_commerce_meta($id, 'is_active', '1') === '1' ? 'Actif' : 'Inactif';
            else { $labels = array('available' => 'Disponible', 'pending' => 'En cours d’achat', 'sold' => 'Vendu'); echo esc_html($labels[oredy_commerce_meta($id, 'status', 'available')] ?? 'Disponible'); }
        }
    }, 10, 2);
}
// WordPress already handles REST CORS; ensure pagination headers are readable by a separate SPA origin.
add_filter('rest_post_dispatch', function($response, $server, $request) {
    if (strpos($request->get_route(), '/oredy-commerce/v1/') === 0 && $response instanceof WP_REST_Response) $response->header('Access-Control-Expose-Headers', 'X-WP-Total, X-WP-TotalPages');
    return $response;
}, 10, 3);
