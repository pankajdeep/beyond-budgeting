import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";

interface ExpenseChartsProps {
  timeframe: "monthly" | "yearly";
}

// Modern dark color palette for 3D effect
const COLORS = [
  "#1E293B", // Slate Dark
  "#312E81", // Indigo Dark
  "#3730A3", // Purple Dark
  "#1F2937", // Cool Gray Dark
  "#292524", // Warm Gray Dark
  "#27272A", // Neutral Dark
  "#1A1E1F", // Stone Dark
  "#1E1B4B", // Deep Purple Dark
];

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

  // Process transaction data by category with enhanced calculations
  const categoryData = transactions?.reduce((acc: any, transaction: any) => {
    const category = transaction.category || 'Other';
    // Only include expenses (negative amounts)
    if (transaction.amount < 0) {
      acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
    }
    return acc;
  }, {});

  const pieChartData = categoryData ? Object.entries(categoryData).map(([name, value]) => ({
    name,
    value: Number(value)
  })).sort((a, b) => b.value - a.value) : []; // Sort by value for better visualization

  // Calculate total expenses for percentage
  const totalExpenses = pieChartData.reduce((sum, item) => sum + item.value, 0);

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
    return <div className="flex items-center justify-center h-[300px]">Loading charts...</div>;
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalExpenses) * 100).toFixed(1);
      
      return (
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded-lg border shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            Amount: {formatCurrency(data.value)}
          </p>
          <p className="text-sm text-muted-foreground">
            {percentage}% of total expenses
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 animate-fadeIn delay-200">
        <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
        <div className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}`}
                outerRadius={({ viewBox }) => Math.min(viewBox?.width || 0, viewBox?.height || 0) / 3}
                innerRadius={({ viewBox }) => (Math.min(viewBox?.width || 0, viewBox?.height || 0) / 3) * 0.6}
                paddingAngle={4}
                dataKey="value"
              >
                {pieChartData.map((entry: any, index: number) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="vertical" 
                align="right"
                verticalAlign="middle"
                formatter={(value, entry: any) => {
                  const percentage = ((entry.payload.value / totalExpenses) * 100).toFixed(1);
                  return `${value} (${percentage}%)`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 animate-fadeIn delay-300">
        <h3 className="text-xl font-semibold mb-4">
          {timeframe === "monthly" ? "Monthly" : "Yearly"} Trends
        </h3>
        <div className="h-[300px] md:h-[400px]">
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