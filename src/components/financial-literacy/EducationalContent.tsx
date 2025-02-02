import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, BookOpen } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Smart Budgeting Strategies",
    description: "Learn effective techniques for managing your monthly expenses and saving more.",
    thumbnail: "/placeholder.svg",
    videoUrl: "#",
    category: "Budgeting",
  },
  {
    id: 2,
    title: "Investment Basics",
    description: "Understanding different investment options and how to build a balanced portfolio.",
    thumbnail: "/placeholder.svg",
    videoUrl: "#",
    category: "Investing",
  },
  {
    id: 3,
    title: "Debt Management Guide",
    description: "Strategies for managing and reducing debt effectively.",
    thumbnail: "/placeholder.svg",
    videoUrl: "#",
    category: "Debt Management",
  },
  {
    id: 4,
    title: "Planning for Retirement",
    description: "Essential steps to prepare for a comfortable retirement.",
    thumbnail: "/placeholder.svg",
    videoUrl: "#",
    category: "Retirement",
  },
];

export const EducationalContent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Educational Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="group hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className="text-lg">{article.title}</CardTitle>
              <CardDescription>{article.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="w-full mr-2">
                <BookOpen className="mr-2 h-4 w-4" />
                Read More
              </Button>
              <Button variant="secondary" className="group-hover:bg-primary transition-colors">
                <Play className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};