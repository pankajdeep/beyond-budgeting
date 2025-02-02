import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FinancialMetrics } from "@/components/dashboard/FinancialMetrics";
import { RecommendationsList } from "@/components/recommendations/RecommendationsList";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      console.log("Fetching user profile...");
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin");
        return null;
      }

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

      // Check if profile is incomplete
      if (!data.monthly_income || !data.monthly_expenses || !data.financial_goals || !data.risk_tolerance || !data.investment_horizon) {
        console.log("Profile incomplete, redirecting to onboarding...");
        navigate("/onboarding");
        return null;
      }

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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      });
      navigate("/signin");
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoadingProfile || isLoadingAccounts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If profile is null (due to redirection), don't render the dashboard
  if (!profile) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Welcome, {profile?.full_name}</h1>
          <p className="text-muted-foreground">
            Track your progress and get personalized recommendations
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
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