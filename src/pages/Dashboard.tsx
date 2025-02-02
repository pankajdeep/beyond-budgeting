import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FinancialMetrics } from "@/components/dashboard/FinancialMetrics";
import { RecommendationsList } from "@/components/recommendations/RecommendationsList";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      console.log("Fetching user profile...");
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session found");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      console.log("Profile data:", data);
      return data;
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

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
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
    </div>
  );
};

export default Dashboard;