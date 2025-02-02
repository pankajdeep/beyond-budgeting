import { FinancialMetrics } from "@/components/dashboard/FinancialMetrics";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";

const Dashboard = () => {
  // This would typically come from your API based on user data analysis
  const recommendations = [
    {
      title: "Start an Emergency Fund",
      description:
        "Based on your income, we recommend saving 3-6 months of expenses.",
      type: "Savings",
      action: "Set up automatic transfers",
    },
    {
      title: "Consider GIC Investment",
      description:
        "With current rates at 4.5%, GICs offer a safe way to grow your savings.",
      type: "Investment",
      action: "Learn more",
    },
    {
      title: "Optimize Your Spending",
      description:
        "We've identified potential savings in your monthly subscriptions.",
      type: "Budgeting",
      action: "Review subscriptions",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Financial Dashboard</h1>
        <p className="text-muted-foreground">
          Track your progress and get personalized recommendations
        </p>
      </div>

      <FinancialMetrics />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Personalized Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((recommendation, index) => (
            <RecommendationCard
              key={index}
              recommendation={recommendation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;