import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { supabase } from "@/integrations/supabase/client";

interface ExpenseChartsProps {
  timeframe: "monthly" | "yearly";
}

// Define a richer color palette
const COLORS = [
  "#2563eb", // Blue
  "#16a34a", // Green
  "#9333ea", // Purple
  "#ea580c", // Orange
  "#0891b2", // Cyan
  "#be123c", // Red
  "#737373", // Gray for "Others"
];

export const ExpenseCharts = ({ timeframe }: ExpenseChartsProps) => {
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);
  const [trendData, setTrendData] = useState([]); // Keep existing trend data structure

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        console.log("Fetching category data...");
        const { data: transactions, error } = await supabase
          .from('user_transactions')
          .select('amount, category, transaction_type')
          .eq('transaction_type', 'expense');

        if (error) {
          console.error('Error fetching transactions:', error);
          return;
        }

        console.log('Raw transactions:', transactions);

        // Group and sum transactions by category
        const categoryTotals = transactions.reduce((acc: { [key: string]: number }, transaction) => {
          const category = transaction.category || 'Uncategorized';
          acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
          return acc;
        }, {});

        // Convert to array and sort by amount
        let sortedCategories = Object.entries(categoryTotals)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value);

        // Take top 6 categories and group the rest as "Others"
        if (sortedCategories.length > 6) {
          const topCategories = sortedCategories.slice(0, 6);
          const othersValue = sortedCategories
            .slice(6)
            .reduce((sum, item) => sum + item.value, 0);
          
          sortedCategories = [
            ...topCategories,
            { name: 'Others', value: othersValue }
          ];
        }

        console.log('Processed category data:', sortedCategories);
        setCategoryData(sortedCategories);
      } catch (error) {
        console.error('Error processing transaction data:', error);
      }
    };

    fetchCategoryData();
  }, [timeframe]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 animate-fadeIn delay-200">
        <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
        <div className="h-[400px] w-full"> {/* Increased height and ensured full width */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={150} // Increased radius
                innerRadius={80} // Increased inner radius for better donut appearance
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
                strokeWidth={2}
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `$${value.toFixed(2)}`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  padding: '8px',
                  border: '1px solid #e2e8f0'
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
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};