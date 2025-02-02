import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface Recommendation {
  title: string;
  description: string;
  type: string;
  action: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export const RecommendationCard = ({
  recommendation,
}: RecommendationCardProps) => {
  return (
    <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-2">
        <Badge variant="secondary" className="mb-2">
          {recommendation.type}
        </Badge>
        <h3 className="text-xl font-semibold">{recommendation.title}</h3>
        <p className="text-muted-foreground">{recommendation.description}</p>
      </div>
      <Button className="w-full group">
        {recommendation.action}
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Card>
  );
};