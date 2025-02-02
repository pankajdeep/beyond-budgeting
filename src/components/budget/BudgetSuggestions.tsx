import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Utensils, 
  CreditCard, 
  PiggyBank,
  TrendingUp,
  AlertCircle,
  Repeat,
  Bell
} from "lucide-react";

const suggestions = [
  {
    title: "Spending Patterns Analysis",
    description: "Your dining expenses have increased by 25% this month. Consider meal prepping to reduce costs.",
    icon: TrendingUp,
    action: "View Analysis",
  },
  {
    title: "Budget Auto-Adjustments",
    description: "Entertainment budget exceeded. We can reallocate funds from your shopping category.",
    icon: Repeat,
    action: "Adjust Budget",
  },
  {
    title: "What's Draining Your Money?",
    description: "Subscription services total $95/month. Review and cancel unused subscriptions.",
    icon: AlertCircle,
    action: "Review Expenses",
  },
  {
    title: "Custom Spending Alerts",
    description: "Set up personalized alerts when spending exceeds your weekly or monthly limits.",
    icon: Bell,
    action: "Set Alerts",
  },
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI-Powered Budget Insights</h2>
        <Button variant="outline" size="sm">
          Refresh Insights
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="text-lg font-semibold">{suggestion.title}</h3>
                <p className="text-muted-foreground text-sm">{suggestion.description}</p>
                <Button variant="ghost" className="w-full justify-between mt-4">
                  {suggestion.action}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};