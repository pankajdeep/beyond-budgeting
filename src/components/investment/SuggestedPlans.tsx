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
import { Coins, Clock, TrendingUp, AlertTriangle } from "lucide-react";

const plans = [
  {
    name: "Conservative Growth",
    risk: "Low",
    growth: "5-7%",
    duration: "3-5 years",
    description: "Focused on capital preservation with steady growth",
    details: [
      "Majority in government bonds and high-grade corporate bonds",
      "Small allocation to blue-chip stocks",
      "Regular rebalancing to maintain risk levels",
    ],
  },
  {
    name: "Balanced Growth",
    risk: "Medium",
    growth: "8-10%",
    duration: "5-7 years",
    description: "Balance between growth and risk management",
    details: [
      "Mix of stocks and bonds",
      "Exposure to different market sectors",
      "Quarterly portfolio rebalancing",
    ],
  },
  {
    name: "Aggressive Growth",
    risk: "High",
    growth: "10-15%",
    duration: "7+ years",
    description: "Maximizing long-term growth potential",
    details: [
      "Higher allocation to stocks",
      "Include emerging market investments",
      "Opportunistic rebalancing strategy",
    ],
  },
];

export const SuggestedPlans = () => {
  return (
    <div className="space-y-6 animate-fadeIn delay-200">
      <div className="flex items-center gap-2">
        <Coins className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Suggested Investment Plans</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span>Risk Level</span>
                  </div>
                  <Badge variant={plan.risk === "High" ? "destructive" : "secondary"}>
                    {plan.risk}
                  </Badge>
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
                    <span>Duration</span>
                  </div>
                  <span>{plan.duration}</span>
                </div>
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="details">
                  <AccordionTrigger>View Details</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-2">
                      {plan.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};