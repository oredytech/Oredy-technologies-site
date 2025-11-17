import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const webhookData = await req.json();
    console.log("Received Lygos webhook:", webhookData);

    const { id: lygosPaymentId, status } = webhookData;

    // Mettre à jour la transaction
    const { data: transaction, error: transactionError } = await supabase
      .from("payment_transactions")
      .update({
        status: status === "success" ? "completed" : "failed",
        completed_at: new Date().toISOString(),
      })
      .eq("lygos_payment_id", lygosPaymentId)
      .select()
      .single();

    if (transactionError) {
      console.error("Transaction update error:", transactionError);
      throw transactionError;
    }

    // Si le paiement est réussi, mettre à jour le statut de l'achat
    if (status === "success" && transaction) {
      const { error: purchaseError } = await supabase
        .from("site_purchases")
        .update({ status: "completed" })
        .eq("id", transaction.purchase_id);

      if (purchaseError) {
        console.error("Purchase update error:", purchaseError);
        throw purchaseError;
      }

      // Mettre à jour le statut du site à "sold"
      const { data: purchase } = await supabase
        .from("site_purchases")
        .select("site_id")
        .eq("id", transaction.purchase_id)
        .single();

      if (purchase) {
        await supabase
          .from("marketplace_sites")
          .update({ status: "sold" })
          .eq("id", purchase.site_id);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in lygos-webhook:", error);
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
