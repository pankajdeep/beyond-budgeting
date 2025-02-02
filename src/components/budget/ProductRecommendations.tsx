import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Shield, Briefcase, Heart } from "lucide-react";

const products = [
  {
    title: "Life Insurance Plus",
    description: "Comprehensive life insurance with investment benefits.",
    icon: Shield,
    action: "Learn More",
  },
  {
    title: "Retirement Solutions",
    description: "Plan your retirement with our expert financial advisors.",
    icon: Briefcase,
    action: "Get Started",
  },
  {
    title: "Health Coverage",
    description: "Protect yourself with our health insurance plans.",
    icon: Heart,
    action: "Explore Plans",
  },
];

export const ProductRecommendations = () => {
  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={product.title}>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <product.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">{product.title}</h3>
                <p className="text-muted-foreground max-w-md">{product.description}</p>
                <Button className="mt-4">
                  {product.action}
                </Button>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};