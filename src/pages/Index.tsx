import { SignUpForm } from "@/components/auth/SignUpForm";
import { RecommendationsList } from "@/components/recommendations/RecommendationsList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        throw error;
      }
      return session;
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      {session ? (
        <div className="w-full max-w-7xl">
          <RecommendationsList />
        </div>
      ) : (
        <div className="text-center space-y-4 mb-8 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold">
            Your Financial Wellness Journey Starts Here
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized financial insights and recommendations tailored
            to your goals
          </p>
          <SignUpForm />
        </div>
      )}
    </div>
  );
};

export default Index;