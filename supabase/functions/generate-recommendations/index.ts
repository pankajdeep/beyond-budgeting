import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, financialData } = await req.json();
    
    console.log('Generating recommendations for user:', userId);
    console.log('Financial data:', financialData);

    // Create OpenAI prompt based on user's financial data
    const prompt = `As a financial advisor, analyze this user's financial data and provide 3 personalized recommendations:
    Monthly Income: $${financialData.monthlyIncome}
    Risk Tolerance: ${financialData.riskTolerance}
    Current Goals: ${financialData.goals.join(', ')}
    Recent Transactions: ${financialData.recentTransactions}
    
    Provide 3 specific, actionable recommendations in JSON format with the following structure:
    {
      "recommendations": [
        {
          "title": "recommendation title",
          "description": "detailed explanation",
          "type": "savings/investment/budgeting/debt/insurance",
          "priority": 1-5 (1 being highest priority)
        }
      ]
    }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a knowledgeable financial advisor.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    const recommendations = JSON.parse(data.choices[0].message.content);

    // Store recommendations in the database
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Delete old recommendations for this user
    await supabase
      .from('recommendations')
      .delete()
      .eq('user_id', userId);

    // Insert new recommendations
    const { error } = await supabase
      .from('recommendations')
      .insert(
        recommendations.recommendations.map((rec: any) => ({
          user_id: userId,
          title: rec.title,
          description: rec.description,
          recommendation_type: rec.type,
          priority: rec.priority
        }))
      );

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(recommendations), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-recommendations function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});