import { Header } from "@/components/layout/Header";
import { InvestmentPortfolio } from "@/components/investment/InvestmentPortfolio";
import { SuggestedPlans } from "@/components/investment/SuggestedPlans";
import { InvestmentComparison } from "@/components/investment/InvestmentComparison";

const Investment = () => {
  return (
    <>
      <Header />
      <div className="w-full px-4 py-8 space-y-8 mt-16">
        <div className="max-w-[1400px] mx-auto space-y-2">
          <h1 className="text-4xl font-bold animate-fadeIn">Investment & Savings</h1>
          <p className="text-muted-foreground animate-fadeIn delay-200">
            Personalized investment planning and portfolio management
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto">
          <InvestmentPortfolio />
          <SuggestedPlans />
          <InvestmentComparison />
        </div>
      </div>
    </>
  );
};

export default Investment;