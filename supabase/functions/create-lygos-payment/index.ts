import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  purchaseId: string;
  siteTitle: string;
  amount: number;
  buyerEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lygosApiKey = Deno.env.get("LYGOS_API_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { purchaseId, siteTitle, amount, buyerEmail }: PaymentRequest = await req.json();

    console.log("Creating Lygos payment for purchase:", purchaseId);

    // Créer le paiement sur Lygos
    const lygosResponse = await fetch("https://api.lygosapp.com/v1/products", {
      method: "POST",
      headers: {
        "api-key": lygosApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `Achat: ${siteTitle}`,
        amount: amount,
        description: `Achat du site web: ${siteTitle}`,
        "success-url": `${supabaseUrl.replace('.supabase.co', '')}/marketplace/payment-success?purchase_id=${purchaseId}`,
        "failure-url": `${supabaseUrl.replace('.supabase.co', '')}/marketplace/payment-failure?purchase_id=${purchaseId}`,
      }),
    });

    if (!lygosResponse.ok) {
      const errorText = await lygosResponse.text();
      console.error("Lygos API error:", errorText);
      throw new Error(`Lygos API error: ${errorText}`);
    }

    const lygosData = await lygosResponse.json();
    console.log("Lygos payment created:", lygosData);

    // Enregistrer la transaction dans la base de données
    const { data: transaction, error: transactionError } = await supabase
      .from("payment_transactions")
      .insert({
        purchase_id: purchaseId,
        lygos_payment_id: lygosData.id,
        amount: amount,
        currency: "USD",
        status: "pending",
        payment_link: lygosData.link,
      })
      .select()
      .single();

    if (transactionError) {
      console.error("Transaction insert error:", transactionError);
      throw transactionError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        paymentLink: lygosData.link,
        transactionId: transaction.id,
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
    console.error("Error in create-lygos-payment:", error);
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
