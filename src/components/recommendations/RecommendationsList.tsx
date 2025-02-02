import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export const RecommendationsList = () => {
  const { data: recommendations, isLoading, refetch } = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recommendations")
        .select("*")
        .order("priority", { ascending: false });

      if (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
      }

      return data;
    },
  });

  const generateRecommendations = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("generate-recommendations");
      
      if (error) throw error;
      
      await refetch();
      toast({
        title: "Success",
        description: "New recommendations have been generated!",
      });
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Your Financial Recommendations</h2>
        <Button onClick={generateRecommendations} className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          Generate New
        </Button>
      </div>
      
      {recommendations && recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={{
                title: recommendation.title,
                description: recommendation.description,
                type: recommendation.recommendation_type,
                action: "Learn More",
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No recommendations yet. Click the button above to generate some personalized financial advice.
          </p>
        </div>
      )}
    </div>
  );
};