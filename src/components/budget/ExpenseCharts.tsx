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
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9A8194",
  "#A3CBB7",
];

export const ExpenseCharts = ({ timeframe }: ExpenseChartsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions', timeframe],
    queryFn: async () => {
      console.log('Fetching transactions...');
      const { data, error } = await supabase
        .from('user_transactions')
        .select('*')
        .order('transaction_date', { ascending: false });

      if (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }

      console.log('Fetched transactions:', data);
      return data || [];
    }
  });

  // Initialize categoryData with an empty object
  const categoryData = transactions.reduce<Record<string, number>>((acc, transaction) => {
    // Ensure transaction and category exist before processing
    if (transaction?.category) {
      const amount = Math.abs(Number(transaction.amount) || 0);
      acc[transaction.category] = (acc[transaction.category] || 0) + amount;
      console.log(`Processing category ${transaction.category}: ${amount}`);
    }
    return acc;
  }, {});

  console.log('Processed category data:', categoryData);

  // Transform data for 3D chart with validation
  const threeDChartData = Object.entries(categoryData || {}).map(([name, value], index) => ({
    name,
    value: Number(value) || 0,
    color: COLORS[index % COLORS.length]
  }));

  console.log('3D chart data:', threeDChartData);

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
    console.log('Category clicked:', category);
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredTransactions = selectedCategory
    ? transactions.filter(t => t?.category === selectedCategory)
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
                  <span>{transaction.description || 'Unnamed Transaction'}</span>
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