import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { NetWorthOverview } from "@/components/dashboard/NetWorthOverview";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { SpendingAnalysis } from "@/components/dashboard/SpendingAnalysis";
import { FinancialGoals } from "@/components/dashboard/FinancialGoals";
import { SmartInsights } from "@/components/dashboard/SmartInsights";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";

const Dashboard = () => {
  const navigate = useNavigate();

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
      return data;
    },
  });

  const { data: accounts, isLoading: isLoadingAccounts } = useQuery({
    queryKey: ["userAccounts"],
    queryFn: async () => {
      console.log("Fetching user accounts...");
      const { data: { session } } = await supabase.auth.getSession();
      
      const { data, error } = await supabase
        .from("user_accounts")
        .select("*")
        .eq("customer_id", session?.user.id);

      if (error) {
        console.error("Error fetching accounts:", error);
        throw error;
      }

      console.log("Accounts data:", data);
      return data;
    },
  });

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ["userTransactions"],
    queryFn: async () => {
      console.log("Fetching user transactions...");
      const { data: { session } } = await supabase.auth.getSession();
      
      const { data, error } = await supabase
        .from("user_transactions")
        .select(`
          *,
          user_accounts (
            account_type,
            account_number
          )
        `)
        .order('transaction_date', { ascending: false })
        .limit(50);

      if (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }

      // For SmartInsights component
      const simplifiedTransactions = data?.map(transaction => ({
        amount: transaction.amount,
        transaction_type: transaction.transaction_type,
        date: transaction.transaction_date,
        category: transaction.category,
        description: transaction.description
      }));

      console.log("Transactions data:", data);
      return data;
    },
  });

  if (isLoadingProfile || isLoadingAccounts || isLoadingTransactions) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  // Calculate monthly income (in a real app, this would come from a more sophisticated calculation)
  const monthlyIncome = accounts?.reduce((sum, account) => {
    return sum + (account.interest_rate || 0) * account.balance / 12;
  }, 3000); // Base income of 3000 plus interest income

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8 mt-16">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold animate-fadeIn">
            Welcome back, {profile?.full_name}
          </h1>
          <p className="text-muted-foreground">
            Here's your financial overview
          </p>
        </div>

        <div className="grid gap-8">
          <FinancialSummary accounts={accounts || []} />
          
          <SmartInsights 
            transactions={simplifiedTransactions || []} 
            monthlyIncome={monthlyIncome || 3000}
          />
          
          <div className="grid md:grid-cols-2 gap-8">
            <NetWorthOverview accounts={accounts || []} />
            <SpendingAnalysis transactions={transactions || []} />
          </div>
          
          <RecentTransactions transactions={transactions || []} />
          
          <FinancialGoals />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
