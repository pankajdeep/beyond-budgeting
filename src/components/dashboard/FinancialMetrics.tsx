import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";

export const FinancialMetrics = () => {
  // This would typically come from your API
  const metrics = {
    monthlySpending: 2500,
    monthlyIncome: 4000,
    savingsGoal: 10000,
    currentSavings: 6000,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            Monthly Spending
          </h3>
          <ArrowUpRight className="h-4 w-4 text-success-500" />
        </div>
        <p className="text-2xl font-bold">
          ${metrics.monthlySpending.toLocaleString()}
        </p>
        <Progress value={60} className="h-2" />
        <p className="text-sm text-muted-foreground">
          60% of monthly budget
        </p>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            Monthly Income
          </h3>
          <ArrowDownRight className="h-4 w-4 text-destructive" />
        </div>
        <p className="text-2xl font-bold">
          ${metrics.monthlyIncome.toLocaleString()}
        </p>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-success-500" />
          <p className="text-sm text-success-500">
            +12% from last month
          </p>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            Savings Progress
          </h3>
          <ArrowUpRight className="h-4 w-4 text-success-500" />
        </div>
        <p className="text-2xl font-bold">
          ${metrics.currentSavings.toLocaleString()}
        </p>
        <Progress
          value={(metrics.currentSavings / metrics.savingsGoal) * 100}
          className="h-2"
        />
        <p className="text-sm text-muted-foreground">
          {((metrics.currentSavings / metrics.savingsGoal) * 100).toFixed(
            0
          )}
          % of goal
        </p>
      </Card>
    </div>
  );
};