import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const FinancialGoals = () => {
  // Placeholder goals data - in a real app, this would come from the backend
  const goals = [
    {
      id: 1,
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Vacation Savings",
      target: 5000,
      current: 3750,
      color: "bg-green-500"
    },
    {
      id: 3,
      name: "New Car Down Payment",
      target: 15000,
      current: 5000,
      color: "bg-purple-500"
    }
  ];

  return (
    <Card className="p-6 animate-fadeIn">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Financial Goals</h3>
        
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{goal.name}</span>
                  <span className="text-muted-foreground">
                    ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};