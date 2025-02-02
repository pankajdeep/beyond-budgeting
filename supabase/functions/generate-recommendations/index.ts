import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the user's session
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Not authenticated');
    }

    // Fetch user's profile data
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      throw new Error('Profile not found');
    }

    // Create OpenAI prompt based on user's financial data
    const prompt = `As a financial advisor, analyze this user's financial data and provide 3 personalized recommendations:
    Monthly Income: $${profile.monthly_income}
    Monthly Expenses: $${profile.monthly_expenses}
    Risk Tolerance: ${profile.risk_tolerance}
    Financial Goals: ${profile.financial_goals}
    Investment Horizon: ${profile.investment_horizon}
    
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

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    const recommendations = JSON.parse(data.choices[0].message.content);

    // Delete old recommendations
    await supabaseClient
      .from('recommendations')
      .delete()
      .eq('user_id', user.id);

    // Insert new recommendations
    const { error: insertError } = await supabaseClient
      .from('recommendations')
      .insert(
        recommendations.recommendations.map((rec: any) => ({
          user_id: user.id,
          title: rec.title,
          description: rec.description,
          recommendation_type: rec.type,
          priority: rec.priority
        }))
      );

    if (insertError) {
      throw insertError;
    }

    return new Response(JSON.stringify({ success: true }), {
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