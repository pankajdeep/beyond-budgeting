import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface ExpenseChartsProps {
  timeframe: "monthly" | "yearly";
}

// Darker, more appealing color palette
const COLORS = [
  "#1A1F2C", // Dark Purple
  "#7E69AB", // Secondary Purple
  "#6E59A5", // Tertiary Purple
  "#403E43", // Charcoal Gray
  "#333333", // Dark Gray
  "#222222", // Darker Gray
];

const fetchExpenseCategories = async () => {
  console.log("Fetching expense categories...");
  const { data, error } = await supabase
    .from('user_transactions')
    .select('category, amount')
    .eq('transaction_type', 'expense')
    .not('category', 'is', null);

  if (error) {
    console.error("Error fetching expense categories:", error);
    throw error;
  }

  // Group and sum expenses by category
  const categoryTotals = data.reduce((acc: { [key: string]: number }, transaction) => {
    const category = transaction.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + Math.abs(Number(transaction.amount));
    return acc;
  }, {});

  // Convert to array and sort by amount
  const sortedCategories = Object.entries(categoryTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6); // Take top 6 categories

  console.log("Processed expense categories:", sortedCategories);
  return sortedCategories;
};

export const ExpenseCharts = ({ timeframe }: ExpenseChartsProps) => {
  const { data: categoryData = [], isLoading, error } = useQuery({
    queryKey: ['expenseCategories', timeframe],
    queryFn: fetchExpenseCategories,
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 animate-pulse">
          <div className="h-[300px] bg-gray-200 rounded-lg"></div>
        </Card>
        <Card className="p-6 animate-pulse">
          <div className="h-[300px] bg-gray-200 rounded-lg"></div>
        </Card>
      </div>
    );
  }

  if (error) {
    console.error("Error in ExpenseCharts:", error);
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="text-red-500">Error loading expense data</div>
        </Card>
      </div>
    );
  }

  // Placeholder trend data (keep existing or implement real data fetching)
  const trendData = [
    { name: "Jan", amount: 2500 },
    { name: "Feb", amount: 2300 },
    { name: "Mar", amount: 2800 },
    { name: "Apr", amount: 2400 },
    { name: "May", amount: 2600 },
    { name: "Jun", amount: 2200 },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 animate-fadeIn delay-200">
        <h3 className="text-xl font-semibold mb-4">Top Expense Categories</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity duration-300"
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `$${value.toFixed(2)}`}
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
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
              <Bar dataKey="amount" fill="#1A1F2C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
