import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Utensils, CreditCard, PiggyBank } from "lucide-react";

const suggestions = [
  {
    title: "Reduce Dining Expenses",
    description: "Consider cooking more meals at home to save on dining expenses.",
    icon: Utensils,
    action: "View Details",
  },
  {
    title: "Optimize Monthly Subscriptions",
    description: "Review and cancel unused subscription services.",
    icon: CreditCard,
    action: "Review Now",
  },
  {
    title: "Maximize Savings on Investments",
    description: "Explore investment opportunities to grow your wealth.",
    icon: PiggyBank,
    action: "Learn More",
  },
];

export const BudgetSuggestions = () => {
  return (
    <div className="grid gap-4">
      {suggestions.map((suggestion, index) => (
        <Card
          key={suggestion.title}
          className="p-6 hover:shadow-lg transition-shadow duration-200 animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <suggestion.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold">{suggestion.title}</h3>
              <p className="text-muted-foreground">{suggestion.description}</p>
            </div>
            <Button variant="ghost" className="mt-2">
              {suggestion.action}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};