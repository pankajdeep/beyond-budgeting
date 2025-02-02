import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvestmentPortfolio } from "@/components/investment/InvestmentPortfolio";
import { SuggestedPlans } from "@/components/investment/SuggestedPlans";
import { InvestmentComparison } from "@/components/investment/InvestmentComparison";
import { Header } from "@/components/layout/Header";

const Investment = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8 mt-16">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Investment & Savings</h1>
          <p className="text-muted-foreground">
            Manage your investments and explore personalized recommendations
          </p>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="plans">Suggested Plans</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-4">
            <InvestmentPortfolio />
          </TabsContent>

          <TabsContent value="plans" className="space-y-4">
            <SuggestedPlans />
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <InvestmentComparison />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Investment;