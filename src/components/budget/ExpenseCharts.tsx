import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";
import { ThreeDChart } from "./ThreeDChart";

interface ExpenseChartsProps {
  timeframe: "monthly" | "yearly";
}

export const ExpenseCharts = ({ timeframe }: ExpenseChartsProps) => {
  console.log("Fetching transaction data for timeframe:", timeframe);

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', timeframe],
    queryFn: async () => {
      const { data: userTransactions, error } = await supabase
        .from('user_transactions')
        .select('*')
        .order('transaction_date', { ascending: false });

      if (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }

      console.log("Fetched transactions:", userTransactions);
      return userTransactions;
    }
  });

  // Process transaction data by category with proper initialization and validation
  const categoryData = transactions?.reduce((acc: Record<string, number>, transaction) => {
    if (!transaction?.category || !transaction?.amount) return acc;
    const category = transaction.category;
    acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
    return acc;
  }, {});

  const pieChartData = categoryData ? Object.entries(categoryData).map(([name, value]) => ({
    name,
    value: Number(value)
  })) : [];

  console.log("Processed category data:", pieChartData);

  // Keep existing trend data for the bar chart
  const trendData = [
    { name: "Jan", amount: 2500 },
    { name: "Feb", amount: 2300 },
    { name: "Mar", amount: 2800 },
    { name: "Apr", amount: 2400 },
    { name: "May", amount: 2600 },
    { name: "Jun", amount: 2200 },
  ];

  if (isLoading) {
    return <div>Loading charts...</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 animate-fadeIn delay-200">
        <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
        <div className="h-[300px] relative">
          <ThreeDChart data={pieChartData} />
        </div>
      </Card>

      <Card className="p-6 animate-fadeIn delay-300">
        <h3 className="text-xl font-semibold mb-4">
          {timeframe === "monthly" ? "Monthly" : "Yearly"} Trends
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
