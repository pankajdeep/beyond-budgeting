import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Award, TrendingUp, Calendar, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Conservative Growth",
    risk: "Low",
    growth: "4-6%",
    duration: "3-5 years",
    description: "A low-risk investment strategy focused on capital preservation with steady growth potential.",
    details: [
      "Majority allocation in government bonds",
      "Regular dividend payments",
      "Lower volatility",
      "Suitable for short-term goals",
    ],
  },
  {
    name: "Balanced Growth",
    risk: "Medium",
    growth: "6-8%",
    duration: "5-7 years",
    description: "A balanced approach combining growth potential with risk management.",
    details: [
      "Mix of stocks and bonds",
      "Moderate dividend yield",
      "Medium volatility",
      "Suitable for medium-term goals",
    ],
  },
  {
    name: "Aggressive Growth",
    risk: "High",
    growth: "8-12%",
    duration: "7+ years",
    description: "A high-growth strategy focused on capital appreciation through equity investments.",
    details: [
      "High allocation in growth stocks",
      "Focus on capital appreciation",
      "Higher volatility",
      "Suitable for long-term goals",
    ],
  },
];

export const SuggestedPlans = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <Card
          key={plan.name}
          className="p-6 hover:shadow-lg transition-shadow duration-200 animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="space-y-4">
            <div className="p-3 bg-primary/10 rounded-full w-fit">
              <Award className="h-6 w-6 text-primary" />
            </div>
            
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-muted-foreground">{plan.description}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span>Expected Growth: {plan.growth}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Duration: {plan.duration}</span>
              </div>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="details">
                <AccordionTrigger>View Details</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                    {plan.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button className="w-full group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};