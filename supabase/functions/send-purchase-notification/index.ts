import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PurchaseNotificationRequest {
  siteTitle: string;
  buyerName: string;
  buyerEmail: string;
  siteId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { siteTitle, buyerName, buyerEmail, siteId }: PurchaseNotificationRequest = await req.json();

    console.log("Sending purchase notifications for site:", siteTitle);

    // Email à l'admin
    const adminEmail = await resend.emails.send({
      from: "Marketplace <onboarding@resend.dev>",
      to: ["oredymusanda@gmail.com"],
      subject: `Nouvelle commande de site: ${siteTitle}`,
      html: `
        <h1>Nouvelle commande de site web</h1>
        <p><strong>Site commandé:</strong> ${siteTitle}</p>
        <p><strong>Nom de l'acheteur:</strong> ${buyerName}</p>
        <p><strong>Email de l'acheteur:</strong> ${buyerEmail}</p>
        <p><strong>ID du site:</strong> ${siteId}</p>
        <br/>
        <p>L'acheteur a été informé des instructions de paiement.</p>
      `,
    });

    console.log("Admin email sent:", adminEmail);

    // Email à l'acheteur
    const buyerEmailResponse = await resend.emails.send({
      from: "Marketplace <onboarding@resend.dev>",
      to: [buyerEmail],
      subject: `Confirmation de votre commande: ${siteTitle}`,
      html: `
        <h1>Merci pour votre commande, ${buyerName}!</h1>
        <p>Vous avez demandé l'achat du site: <strong>${siteTitle}</strong></p>
        
        <h2>Instructions de paiement</h2>
        <p>Pour finaliser votre achat, veuillez envoyer le paiement via:</p>
        <ul>
          <li><strong>Airtel Money:</strong> +243 996886079</li>
          <li><strong>Orange Money:</strong> +243 851006476</li>
        </ul>
        
        <p><strong>Nom du destinataire:</strong> MUSANDA FABRICE / OREDY MUSANDA</p>
        
        <h2>Prochaines étapes</h2>
        <p>Après avoir effectué le paiement, veuillez nous envoyer une capture d'écran du message de confirmation de transaction à cette adresse email.</p>
        
        <p>Une fois votre paiement vérifié, nous vous enverrons les détails d'accès au site.</p>
        
        <p>Cordialement,<br/>L'équipe Marketplace</p>
      `,
    });

    console.log("Buyer email sent:", buyerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail, 
        buyerEmail: buyerEmailResponse 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-purchase-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
