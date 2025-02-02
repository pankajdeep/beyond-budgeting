import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseCharts } from "@/components/budget/ExpenseCharts";
import { BudgetSuggestions } from "@/components/budget/BudgetSuggestions";
import { ProductRecommendations } from "@/components/budget/ProductRecommendations";

const Budget = () => {
  const [timeframe, setTimeframe] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Budget & Expenses</h1>
        <p className="text-muted-foreground">
          Track your spending and get personalized financial insights
        </p>
      </div>

      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="charts">Expense Analysis</TabsTrigger>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="products">Product Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Expense Overview</h2>
              <div className="flex gap-2">
                <TabsList>
                  <TabsTrigger
                    value="monthly"
                    onClick={() => setTimeframe("monthly")}
                    className={timeframe === "monthly" ? "bg-primary text-white" : ""}
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value="yearly"
                    onClick={() => setTimeframe("yearly")}
                    className={timeframe === "yearly" ? "bg-primary text-white" : ""}
                  >
                    Yearly
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <ExpenseCharts timeframe={timeframe} />
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <BudgetSuggestions />
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <ProductRecommendations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Budget;