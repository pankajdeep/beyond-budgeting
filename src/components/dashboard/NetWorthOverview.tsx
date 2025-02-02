import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/utils";

interface Account {
  account_id: string;
  account_type: string;
  balance: number;
}

interface NetWorthOverviewProps {
  accounts: Account[];
}

export const NetWorthOverview = ({ accounts }: NetWorthOverviewProps) => {
  const COLORS = ['#FFCD00', '#FFD700', '#FDE68A', '#FCD34D', '#8884d8'];

  const data = accounts.map(account => ({
    name: account.account_type,
    value: account.balance
  }));

  const totalNetWorth = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <Card className="p-6 animate-fadeIn bg-white/10 backdrop-blur-lg border border-white/20">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-primary">Net Worth Overview</h3>
          <p className="text-3xl font-bold text-white mt-2">{formatCurrency(totalNetWorth)}</p>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};