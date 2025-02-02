import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Coins, Clock, TrendingUp, AlertTriangle, ExternalLink, Shield, Scale, Flame, ArrowRight, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "SunFlex Retirement",
    risk: "Low",
    growth: "3-5%",
    growthProfile: "Conservative",
    duration: "5+ years",
    description: "Guaranteed retirement income with protection against market downturns",
    provider: "SunLife",
    url: "https://www.sunlife.ca/en/investments/guaranteed-investments/",
    details: [
      "Guaranteed Investment Certificates (GICs) with competitive rates",
      "Guaranteed retirement income options",
      "Principal protection with potential for growth",
      "Flexible investment terms from 1 to 5 years",
      "Option to receive income monthly, quarterly, or annually"
    ],
  },
  {
    name: "Sun Life Granite Balanced Portfolio",
    risk: "Moderate",
    growth: "6-8%",
    growthProfile: "Balanced",
    duration: "7-10 years",
    description: "Diversified portfolio balancing growth potential with downside protection",
    provider: "SunLife",
    url: "https://www.sunlife.ca/en/investments/mutual-funds/",
    details: [
      "Professional portfolio management",
      "Mix of stocks, bonds, and alternative investments",
      "Regular portfolio rebalancing",
      "Access to global investment opportunities",
      "Tactical asset allocation to manage risk"
    ],
  },
  {
    name: "Sun Life MFS Global Growth Fund",
    risk: "High",
    growth: "8-12%",
    growthProfile: "Aggressive",
    duration: "10+ years",
    description: "Aggressive growth through global equity investments",
    provider: "SunLife",
    url: "https://www.sunlife.ca/en/investments/mutual-funds/",
    details: [
      "Focus on high-growth global companies",
      "Active management by experienced team",
      "Exposure to emerging markets",
      "Long-term capital appreciation focus",
      "Potential for higher returns with higher volatility"
    ],
  },
];

export const SuggestedPlans = () => {
  return (
    <div className="space-y-6 animate-fadeIn delay-200">
      <div className="flex items-center gap-2">
        <Coins className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">SunLife Investment Plans</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className="hover:shadow-lg transition-shadow flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                </div>
                <Badge 
                  variant={
                    plan.risk === "High" ? "destructive" : 
                    plan.risk === "Moderate" ? "secondary" : 
                    "outline"
                  }
                  className={`text-center px-3 ${plan.risk === "Moderate" ? "text-white" : ""}`}
                >
                  {plan.risk} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                  {plan.risk === "Low" && <Shield className="h-4 w-4 text-green-500" />}
                  {plan.risk === "Moderate" && <Scale className="h-4 w-4 text-yellow-500" />}
                  {plan.risk === "High" && <Flame className="h-4 w-4 text-red-500" />}
                  <span>Risk Tolerance: {plan.risk}</span>
                </div>

                <div className="flex items-center gap-2">
                  {plan.growthProfile === "Conservative" && <ArrowDownLeft className="h-4 w-4 text-blue-500" />}
                  {plan.growthProfile === "Balanced" && <ArrowRight className="h-4 w-4 text-yellow-500" />}
                  {plan.growthProfile === "Aggressive" && <ArrowUpRight className="h-4 w-4 text-red-500" />}
                  <span>Growth Profile: {plan.growthProfile}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>Expected Growth</span>
                  </div>
                  <span className="font-medium text-primary">{plan.growth}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Recommended Term</span>
                  </div>
                  <span>{plan.duration}</span>
                </div>
              </div>

              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="details">
                  <AccordionTrigger>View Details</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-2">
                      {plan.details.map((detail, index) => (
                        <li key={index} className="text-sm text-muted-foreground">{detail}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button 
                className="w-full group mt-4"
                variant="outline"
                onClick={() => window.open(plan.url, '_blank')}
              >
                Learn More
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-4">
                <AlertTriangle className="h-3 w-3" />
                <span>Investment products provided by SunLife Financial</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
