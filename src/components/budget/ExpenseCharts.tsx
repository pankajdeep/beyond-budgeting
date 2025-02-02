import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";

interface ExpenseChartsProps {
  accountId: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export const ExpenseCharts = ({ accountId }: ExpenseChartsProps) => {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions', accountId],
    queryFn: async () => {
      if (!accountId) return [];
      
      const { data, error } = await supabase
        .from('user_transactions')
        .select('*')
        .eq('account_id', accountId)
        .eq('transaction_type', 'Withdrawal')
        .gte('transaction_date', new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString());
      
      if (error) throw error;
      return data;
    },
    enabled: !!accountId,
  });

  // Process data for category breakdown
  const categoryData = transactions.reduce((acc: any[], transaction) => {
    const category = transaction.category || 'Other';
    const existingCategory = acc.find(item => item.name === category);
    
    if (existingCategory) {
      existingCategory.value += Math.abs(transaction.amount);
    } else {
      acc.push({
        name: category,
        value: Math.abs(transaction.amount)
      });
    }
    
    return acc;
  }, []);

  // Process data for monthly trends
  const monthlyData = transactions.reduce((acc: any[], transaction) => {
    const month = format(new Date(transaction.transaction_date), 'MMM');
    const existingMonth = acc.find(item => item.name === month);
    
    if (existingMonth) {
      existingMonth.amount += Math.abs(transaction.amount);
    } else {
      acc.push({
        name: month,
        amount: Math.abs(transaction.amount)
      });
    }
    
    return acc;
  }, []);

  if (!accountId) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Please select an account to view expense analysis
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading transaction data...
      </div>
    );
  }

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
                {categoryData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 animate-fadeIn delay-300">
        <h3 className="text-xl font-semibold mb-4">Monthly Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart data={monthlyData} margin={{ right: 10, left: 10 }}>
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value)} 
                width={80}
              />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="amount" fill="#0f434e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};