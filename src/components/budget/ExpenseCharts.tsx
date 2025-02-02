import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";
import { ThreeDChart } from "./ThreeDChart";
import { useState } from "react";

interface ExpenseChartsProps {
  timeframe: "monthly" | "yearly";
}

const COLORS = [
  "#FF6B6B", // Coral Red
  "#4ECDC4", // Turquoise
  "#45B7D1", // Sky Blue
  "#96CEB4", // Sage Green
  "#FFEEAD", // Cream Yellow
  "#D4A5A5", // Dusty Rose
  "#9A8194", // Muted Purple
  "#A3CBB7", // Mint Green
];

export const ExpenseCharts = ({ timeframe }: ExpenseChartsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

      return userTransactions;
    }
  });

  const categoryData = transactions?.reduce((acc: Record<string, number>, transaction) => {
    if (transaction.category) {
      acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount);
    }
    return acc;
  }, {});

  const threeDChartData = categoryData ? 
    Object.entries(categoryData).map(([name, value], index) => ({
      name,
      value: Number(value),
      color: COLORS[index % COLORS.length]
    })) : [];

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

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredTransactions = selectedCategory
    ? transactions?.filter(t => t.category === selectedCategory)
    : [];

  return (
    <div className="space-y-6">
      <Card className="p-6 animate-fadeIn delay-200">
        <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
        <ThreeDChart 
          data={threeDChartData}
          onCategoryClick={handleCategoryClick}
        />
        {selectedCategory && (
          <div className="mt-4 space-y-2">
            <h4 className="font-medium text-lg">{selectedCategory} Transactions</h4>
            <div className="space-y-2">
              {filteredTransactions.map((transaction) => (
                <div 
                  key={transaction.transaction_id}
                  className="flex justify-between items-center p-2 bg-secondary/5 rounded-lg"
                >
                  <span>{transaction.description}</span>
                  <span className="font-medium">{formatCurrency(transaction.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6 animate-fadeIn delay-300">
        <h3 className="text-xl font-semibold mb-4">
          {timeframe === "monthly" ? "Monthly" : "Yearly"} Trends
        </h3>
        <div className="h-[300px]">
          <BarChart width={800} height={300} data={trendData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </div>
      </Card>
    </div>
  );
};