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
    console.log('Starting generate-recommendations function');
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Get the user's session
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      console.error('Auth error:', authError);
      throw new Error('Not authenticated');
    }

    console.log('Authenticated user ID:', user.id);

    // Fetch user's profile data using the service role client
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    console.log('Profile fetch result:', { profile, profileError });

    if (profileError) {
      console.error('Profile error:', profileError);
      throw new Error(`Profile error: ${profileError.message}`);
    }

    if (!profile) {
      console.error('Profile not found for user:', user.id);
      throw new Error('Profile not found - Please complete onboarding first');
    }

    // Create OpenAI prompt based on user's financial data
    const prompt = `As a financial advisor, analyze this user's financial data and provide 3 personalized recommendations:
    Monthly Income: $${profile.monthly_income || 0}
    Monthly Expenses: $${profile.monthly_expenses || 0}
    Risk Tolerance: ${profile.risk_tolerance || 'Not specified'}
    Financial Goals: ${profile.financial_goals || 'Not specified'}
    Investment Horizon: ${profile.investment_horizon || 'Not specified'}
    
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

    console.log('Sending request to OpenAI');

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a knowledgeable financial advisor.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!openAIResponse.ok) {
      console.error('OpenAI API error:', await openAIResponse.text());
      throw new Error('Failed to get response from OpenAI');
    }

    const data = await openAIResponse.json();
    console.log('OpenAI response:', data);

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid OpenAI response:', data);
      throw new Error('Invalid response from OpenAI');
    }

    let recommendations;
    try {
      recommendations = JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      throw new Error('Invalid JSON response from OpenAI');
    }

    // Delete old recommendations
    const { error: deleteError } = await supabaseClient
      .from('recommendations')
      .delete()
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Error deleting old recommendations:', deleteError);
      throw deleteError;
    }

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
      console.error('Error inserting recommendations:', insertError);
      throw insertError;
    }

    console.log('Successfully generated and saved recommendations');

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-recommendations function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});