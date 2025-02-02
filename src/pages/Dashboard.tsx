import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FinancialMetrics } from "@/components/dashboard/FinancialMetrics";
import { RecommendationsList } from "@/components/recommendations/RecommendationsList";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      console.log("Fetching user profile and onboarding data...");
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin");
        return null;
      }

      // Fetch both profile and onboarding data
      const [profileResponse, onboardingResponse] = await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single(),
        supabase
          .from("user_onboarding")
          .select("*")
          .eq("user_id", session.user.id)
          .single()
      ]);

      if (profileResponse.error) {
        console.error("Error fetching profile:", profileResponse.error);
        throw profileResponse.error;
      }

      // If no onboarding data exists, redirect to onboarding
      if (onboardingResponse.error || !onboardingResponse.data) {
        console.log("Onboarding data not found, redirecting to onboarding...");
        navigate("/onboarding");
        return null;
      }

      // Combine profile and onboarding data
      return {
        ...profileResponse.data,
        ...onboardingResponse.data
      };
    },
  });

  const { data: bankAccounts, isLoading: isLoadingAccounts } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: async () => {
      console.log("Fetching bank accounts...");
      const { data, error } = await supabase
        .from("bank_accounts")
        .select(`
          *,
          transactions(*)
        `);

      if (error) {
        console.error("Error fetching bank accounts:", error);
        throw error;
      }

      console.log("Bank accounts data:", data);
      return data;
    },
  });

  if (isLoadingProfile || isLoadingAccounts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8 mt-16">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Welcome, {profile?.full_name}</h1>
          <p className="text-muted-foreground">
            Track your progress and get personalized recommendations
          </p>
        </div>

        <FinancialMetrics
          monthlyIncome={profile?.monthly_income || 0}
          monthlyExpenses={profile?.monthly_expenses || 0}
          bankAccounts={bankAccounts || []}
        />

        <RecommendationsList />

        <ChatWindow />
      </div>
    </>
  );
};

export default Dashboard;
