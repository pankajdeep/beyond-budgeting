import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type RiskProfile = 'Low' | 'Moderate' | 'High';

interface AllocationStrategy {
  stocks: number;
  bonds: number;
  mutualFunds: number;
  crypto: number;
  cash: number;
}

const allocationStrategies: Record<RiskProfile, AllocationStrategy> = {
  Low: {
    stocks: 20,
    bonds: 50,
    mutualFunds: 20,
    crypto: 0,
    cash: 10,
  },
  Moderate: {
    stocks: 40,
    bonds: 30,
    mutualFunds: 20,
    crypto: 5,
    cash: 5,
  },
  High: {
    stocks: 60,
    bonds: 10,
    mutualFunds: 15,
    crypto: 10,
    cash: 5,
  },
};

export const InvestmentProfile = () => {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      console.log("Fetching user profile data...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");
      
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (error) throw error;
      return profileData;
    },
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ["user-transactions"],
    queryFn: async () => {
      console.log("Fetching user transactions...");
      const { data, error } = await supabase
        .from("user_transactions")
        .select("*")
        .order("transaction_date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const determineRiskProfile = (): { profile: RiskProfile; reason: string } => {
    if (!profile || !transactions) {
      return { profile: 'Moderate', reason: 'Insufficient data for analysis' };
    }

    const age = profile.age;
    const occupation = profile.occupation;
    
    // Calculate monthly expenses from transactions
    const monthlyExpenses = transactions.reduce((sum, t) => 
      t.transaction_type === 'expense' ? sum + Number(t.amount) : sum, 0) / 
      (transactions.length > 0 ? Math.ceil(transactions.length / 30) : 1);

    // Calculate monthly income from transactions
    const monthlyIncome = transactions.reduce((sum, t) => 
      t.transaction_type === 'income' ? sum + Number(t.amount) : sum, 0) / 
      (transactions.length > 0 ? Math.ceil(transactions.length / 30) : 1);

    // Determine job stability (simple heuristic)
    const stableJobs = ['engineer', 'doctor', 'teacher', 'professor', 'manager'];
    const hasStableJob = stableJobs.some(job => 
      occupation.toLowerCase().includes(job.toLowerCase())
    );

    // Low Risk Profile Conditions
    if (
      age > 45 || 
      (monthlyIncome < 5000 && !hasStableJob) || 
      (monthlyExpenses > monthlyIncome * 0.7)
    ) {
      return {
        profile: 'Low',
        reason: `Based on your ${age > 45 ? 'age' : 'income-to-expense ratio'} and ${hasStableJob ? 'stable' : 'variable'} occupation, a low-risk approach is recommended to protect your wealth.`
      };
    }
    
    // High Risk Profile Conditions
    if (
      age < 35 && 
      monthlyIncome > 8000 && 
      hasStableJob && 
      monthlyExpenses < monthlyIncome * 0.5
    ) {
      return {
        profile: 'High',
        reason: 'Given your young age, high income, stable job, and good savings rate, you can afford to take more investment risks for potentially higher returns.'
      };
    }
    
    // Moderate Risk Profile (Default)
    return {
      profile: 'Moderate',
      reason: 'Based on your balanced age, income, and expense profile, a moderate-risk investment approach offers a good balance of growth and stability.'
    };
  };

  if (profileLoading || transactionsLoading) {
    return (
      <Card className="animate-pulse hover:shadow-lg transition-all duration-300 hover:border-primary">
        <CardHeader>
          <CardTitle>Investment Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </CardContent>
      </Card>
    );
  }

  const { profile: riskProfile, reason } = determineRiskProfile();
  const allocation = allocationStrategies[riskProfile];

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Investment Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Risk Tolerance Level</h3>
            <span className={`font-medium ${
              riskProfile === 'Low' ? 'text-blue-500' :
              riskProfile === 'Moderate' ? 'text-yellow-500' :
              'text-red-500'
            }`}>
              {riskProfile} Risk
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{reason}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recommended Asset Allocation</h3>
          <div className="space-y-3">
            {Object.entries(allocation).map(([asset, percentage]) => (
              <div key={asset} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize">{asset.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span>{percentage}%</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            <p>
              This is a general recommendation based on your profile. Consider consulting with a financial advisor for personalized investment advice.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};