import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface ExpenseChartsProps {
  timeframe: "monthly" | "yearly";
}

// Placeholder data
const categoryData = [
  { name: "Housing", value: 1500 },
  { name: "Food", value: 500 },
  { name: "Transportation", value: 300 },
  { name: "Entertainment", value: 200 },
  { name: "Utilities", value: 250 },
];

const trendData = [
  { name: "Jan", amount: 2500 },
  { name: "Feb", amount: 2300 },
  { name: "Mar", amount: 2800 },
  { name: "Apr", amount: 2400 },
  { name: "May", amount: 2600 },
  { name: "Jun", amount: 2200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export const ExpenseCharts = ({ timeframe }: ExpenseChartsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 animate-fadeIn delay-200">
        <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
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