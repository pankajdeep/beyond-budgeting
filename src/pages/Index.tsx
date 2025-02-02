import { SignUpForm } from "@/components/auth/SignUpForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="text-center space-y-4 mb-8 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold">
          Your Financial Wellness Journey Starts Here
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get personalized financial insights and recommendations tailored
          to your goals
        </p>
      </div>
      <SignUpForm />
    </div>
  );
};

export default Index;