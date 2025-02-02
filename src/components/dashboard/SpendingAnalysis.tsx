import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/utils";

interface Transaction {
  amount: number;
  category: string;
  transaction_type: string;
}

interface SpendingAnalysisProps {
  transactions: Transaction[];
}

export const SpendingAnalysis = ({ transactions }: SpendingAnalysisProps) => {
  const spendingByCategory = transactions
    .filter(t => t.transaction_type === 'Withdrawal' && t.category)
    .reduce((acc, transaction) => {
      const category = transaction.category || 'Other';
      acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
      return acc;
    }, {} as Record<string, number>);

  const data = Object.entries(spendingByCategory)
    .map(([category, amount]) => ({
      category,
      amount
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <Card className="p-6 animate-fadeIn bg-white/10 backdrop-blur-lg border border-white/20">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Top Spending Categories</h3>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="category"
                tick={{ fontSize: 12, fill: '#FFCD00' }}
                interval={0}
              />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value)}
                width={80}
                tick={{ fill: '#FFCD00' }}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              />
              <Bar 
                dataKey="amount" 
                fill="#FFCD00"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};