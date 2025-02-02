import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const FinancialGoals = () => {
  const goals = [
    {
      id: 1,
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      color: "bg-primary"
    },
    {
      id: 2,
      name: "Vacation Savings",
      target: 5000,
      current: 3750,
      color: "bg-success-500"
    },
    {
      id: 3,
      name: "New Car Down Payment",
      target: 15000,
      current: 5000,
      color: "bg-secondary-light"
    }
  ];

  return (
    <Card className="p-6 animate-fadeIn bg-white/10 backdrop-blur-lg border border-white/20">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-primary">Financial Goals</h3>
        
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white">{goal.name}</span>
                  <span className="text-primary-200">
                    ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={progress} className="h-2" indicatorClassName={goal.color} />
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};