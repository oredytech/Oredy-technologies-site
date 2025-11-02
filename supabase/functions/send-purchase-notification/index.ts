import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PurchaseNotificationRequest {
  siteTitle: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  siteId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { siteTitle, buyerName, buyerEmail, buyerPhone, siteId }: PurchaseNotificationRequest = await req.json();

    console.log("Sending purchase notification for site:", siteTitle);

    // Email à l'admin avec toutes les infos de l'acheteur
    const adminEmail = await resend.emails.send({
      from: "Marketplace <onboarding@resend.dev>",
      to: ["oredymusanda@gmail.com"],
      subject: `Nouvelle commande de site: ${siteTitle}`,
      html: `
        <h1>Nouvelle commande de site web</h1>
        <p><strong>Site commandé:</strong> ${siteTitle}</p>
        <p><strong>ID du site:</strong> ${siteId}</p>
        
        <h2>Informations de l'acheteur</h2>
        <ul>
          <li><strong>Nom:</strong> ${buyerName}</li>
          <li><strong>Email:</strong> ${buyerEmail}</li>
          <li><strong>Téléphone:</strong> ${buyerPhone}</li>
        </ul>
        
        <h2>Instructions de paiement à communiquer</h2>
        <ul>
          <li><strong>Airtel Money:</strong> +243 996886079</li>
          <li><strong>Orange Money:</strong> +243 851006476</li>
        </ul>
        <p><strong>Nom du destinataire:</strong> MUSANDA FABRICE / OREDY MUSANDA</p>
        
        <br/>
        <p>Veuillez contacter l'acheteur pour finaliser la transaction.</p>
      `,
    });

    console.log("Admin email sent:", adminEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail
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
