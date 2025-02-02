import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Bell, TrendingDown, Calendar, Lightbulb } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Transaction {
  amount: number;
  transaction_type: string;
  date: string;
  category?: string;
}

interface SmartInsightsProps {
  transactions: Transaction[];
  monthlyIncome: number;
}

export const SmartInsights = ({ transactions, monthlyIncome }: SmartInsightsProps) => {
  // Calculate current month's spending
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  
  const currentMonthSpending = transactions
    .filter(t => 
      t.transaction_type === 'Withdrawal' && 
      new Date(t.date).getMonth() === currentMonth
    )
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const lastMonthSpending = transactions
    .filter(t => 
      t.transaction_type === 'Withdrawal' && 
      new Date(t.date).getMonth() === lastMonth
    )
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Calculate spending by category for recommendations
  const categorySpending = transactions
    .filter(t => t.transaction_type === 'Withdrawal' && t.category)
    .reduce((acc, t) => {
      const category = t.category || 'Other';
      acc[category] = (acc[category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  // Find highest spending category
  const highestCategory = Object.entries(categorySpending)
    .sort(([,a], [,b]) => b - a)[0];

  // Simulate upcoming bills (in a real app, this would come from a bills tracking system)
  const upcomingBills = [
    { name: "Rent/Mortgage", amount: monthlyIncome * 0.3, dueDate: "25th" },
    { name: "Utilities", amount: monthlyIncome * 0.05, dueDate: "15th" }
  ];

  const spendingIncrease = currentMonthSpending - lastMonthSpending;

  return (
    <Card className="p-6 animate-fadeIn hover:shadow-lg transition-all duration-300 hover:border-primary">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-primary" />
        Smart Insights
      </h2>
      
      <div className="space-y-4">
        {/* Spending Alert */}
        {spendingIncrease > 0 && (
          <Alert variant="destructive">
            <TrendingDown className="h-4 w-4" />
            <AlertTitle>Spending Alert</AlertTitle>
            <AlertDescription>
              Your spending is {formatCurrency(spendingIncrease)} higher than last month.
              Consider reviewing your expenses in {highestCategory?.[0]} 
              ({formatCurrency(highestCategory?.[1])}).
            </AlertDescription>
          </Alert>
        )}

        {/* Upcoming Bills */}
        <Alert>
          <Calendar className="h-4 w-4" />
          <AlertTitle>Upcoming Bills</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 space-y-1">
              {upcomingBills.map((bill, index) => (
                <li key={index} className="flex justify-between">
                  <span>{bill.name} (Due {bill.dueDate})</span>
                  <span className="font-medium">{formatCurrency(bill.amount)}</span>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>

        {/* Savings Recommendation */}
        <Alert className="bg-primary/10 border-primary">
          <Bell className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary">Savings Opportunity</AlertTitle>
          <AlertDescription>
            Based on your spending patterns, you could save approximately
            {' '}{formatCurrency(highestCategory?.[1] * 0.2)} by reducing expenses in
            {' '}{highestCategory?.[0]}.
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
};