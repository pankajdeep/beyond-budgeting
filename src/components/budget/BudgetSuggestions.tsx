import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  TrendingUp,
  AlertCircle,
  Repeat,
  Bell,
  Info
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const BudgetSuggestions = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["user-transactions"],
    queryFn: async () => {
      console.log("Fetching user transactions for budget insights");
      const { data, error } = await supabase
        .from("user_transactions")
        .select("*")
        .order("transaction_date", { ascending: false });

      if (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }

      console.log("Fetched transactions:", data);
      return data;
    },
  });

  const generateInsights = () => {
    if (!transactions || transactions.length === 0) {
      return [];
    }

    // Calculate total spending by category
    const categoryTotals = transactions.reduce((acc, transaction) => {
      const category = transaction.category || "Uncategorized";
      if (transaction.transaction_type === "expense") {
        acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
      }
      return acc;
    }, {} as Record<string, number>);

    console.log("Category totals:", categoryTotals);

    // Calculate month-over-month changes
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const currentMonthTransactions = transactions.filter(
      (t) => new Date(t.transaction_date).getMonth() === currentMonth
    );
    const lastMonthTransactions = transactions.filter(
      (t) => new Date(t.transaction_date).getMonth() === lastMonth
    );

    const currentMonthTotal = currentMonthTransactions.reduce(
      (sum, t) => sum + Math.abs(t.amount),
      0
    );
    const lastMonthTotal = lastMonthTransactions.reduce(
      (sum, t) => sum + Math.abs(t.amount),
      0
    );

    const spendingChange = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

    // Generate insights based on the analysis
    const insights = [
      {
        title: "Spending Patterns Analysis",
        description: `Your total spending ${
          spendingChange > 0 ? "increased" : "decreased"
        } by ${Math.abs(spendingChange).toFixed(1)}% compared to last month.`,
        icon: TrendingUp,
        action: "View Analysis",
        explanation: "This insight is calculated by comparing your total spending this month " +
          `($${currentMonthTotal.toFixed(2)}) with last month ($${lastMonthTotal.toFixed(2)}). ` +
          "The percentage change helps you understand your spending trajectory."
      },
      {
        title: "Category Breakdown",
        description: `Your highest spending category is ${
          Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0]
        }.`,
        icon: Repeat,
        action: "View Categories",
        explanation: "We analyzed your transactions by category and identified the category " +
          "with the highest total spending. This helps you understand where most of your money goes."
      },
      {
        title: "Recent Transactions Alert",
        description: `You have ${
          currentMonthTransactions.length
        } transactions this month totaling $${currentMonthTotal.toFixed(2)}.`,
        icon: AlertCircle,
        action: "View Details",
        explanation: "This insight counts your transactions from the current month and sums up " +
          "their total value to give you a quick overview of your monthly activity."
      },
      {
        title: "Budget Recommendations",
        description: "Set up custom budget alerts to track your spending in real-time.",
        icon: Bell,
        action: "Set Alerts",
        explanation: "Based on your transaction patterns and spending categories, " +
          "we recommend setting up alerts to help you stay within your budget goals."
      }
    ];

    return insights;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const suggestions = generateInsights();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button variant="outline" size="sm">
          Refresh Insights
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {suggestions.map((suggestion, index) => (
          <Card
            key={suggestion.title}
            className="p-6 hover:shadow-lg transition-shadow duration-200 animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <suggestion.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold">{suggestion.title}</h3>
                <p className="text-muted-foreground text-sm">{suggestion.description}</p>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between mt-4">
                      <span className="flex items-center">
                        <Info className="mr-2 h-4 w-4" />
                        How was this calculated?
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">AI Insight Explanation</h4>
                      <p className="text-sm text-muted-foreground">
                        {suggestion.explanation}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};