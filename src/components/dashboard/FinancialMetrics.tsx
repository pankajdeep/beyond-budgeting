import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";

interface BankAccount {
  id: string;
  account_name: string;
  balance: number;
  transactions: Array<{
    amount: number;
    transaction_type: string;
    date: string;
  }>;
}

interface FinancialMetricsProps {
  monthlyIncome: number;
  monthlyExpenses: number;
  bankAccounts: BankAccount[];
}

export const FinancialMetrics = ({
  monthlyIncome = 0,
  monthlyExpenses = 0,
  bankAccounts = [],
}: FinancialMetricsProps) => {
  const totalBalance = bankAccounts?.reduce((sum, account) => sum + (account?.balance || 0), 0);
  const savingsGoal = monthlyIncome * 6; // 6 months of income as emergency fund goal
  
  // Calculate monthly spending from transactions, defaulting to monthlyExpenses if no transactions
  const currentMonthTransactions = bankAccounts?.flatMap(account =>
    account.transactions?.filter(t => 
      t.transaction_type === 'expense' && 
      new Date(t.date).getMonth() === new Date().getMonth()
    ) || []
  );
  
  const monthlySpending = currentMonthTransactions.length > 0
    ? currentMonthTransactions.reduce((sum, t) => sum + t.amount, 0)
    : monthlyExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
      <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300 hover:border-primary">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            Monthly Spending
          </h3>
          <ArrowUpRight className="h-4 w-4 text-destructive" />
        </div>
        <p className="text-2xl font-bold">
          ${monthlySpending?.toLocaleString() || '0'}
        </p>
        <Progress 
          value={monthlyIncome > 0 ? (monthlySpending / monthlyIncome) * 100 : 0} 
          className="h-2" 
        />
        <p className="text-sm text-muted-foreground">
          {monthlyIncome > 0 ? ((monthlySpending / monthlyIncome) * 100).toFixed(0) : 0}% of monthly income
        </p>
      </Card>

      <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300 hover:border-primary">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            Monthly Income
          </h3>
          <ArrowDownRight className="h-4 w-4 text-success-500" />
        </div>
        <p className="text-2xl font-bold">
          ${monthlyIncome?.toLocaleString() || '0'}
        </p>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-success-500" />
          <p className="text-sm text-success-500">
            Net monthly income
          </p>
        </div>
      </Card>

      <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300 hover:border-primary">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Balance
          </h3>
          <ArrowUpRight className="h-4 w-4 text-success-500" />
        </div>
        <p className="text-2xl font-bold">
          ${totalBalance?.toLocaleString() || '0'}
        </p>
        <Progress
          value={savingsGoal > 0 ? (totalBalance / savingsGoal) * 100 : 0}
          className="h-2"
        />
        <p className="text-sm text-muted-foreground">
          {savingsGoal > 0 ? ((totalBalance / savingsGoal) * 100).toFixed(0) : 0}% of emergency fund goal
        </p>
      </Card>
    </div>
  );
};