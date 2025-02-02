import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    financialGoals: "",
    riskTolerance: "",
    investmentHorizon: "",
    monthlyIncome: "",
    monthlyExpenses: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Here we would typically make an API call to save the onboarding data
    console.log("Onboarding completed:", answers);
    toast({
      title: "Profile completed!",
      description: "Welcome to your financial wellness journey.",
    });
    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold">Financial Goals</h2>
            <RadioGroup
              value={answers.financialGoals}
              onValueChange={(value) =>
                setAnswers({ ...answers, financialGoals: value })
              }
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="savings" id="savings" />
                  <Label htmlFor="savings">Build Emergency Savings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="investment" id="investment" />
                  <Label htmlFor="investment">Start Investing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debt" id="debt" />
                  <Label htmlFor="debt">Pay Off Debt</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="retirement" id="retirement" />
                  <Label htmlFor="retirement">Plan for Retirement</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold">Risk Tolerance</h2>
            <RadioGroup
              value={answers.riskTolerance}
              onValueChange={(value) =>
                setAnswers({ ...answers, riskTolerance: value })
              }
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="conservative" id="conservative" />
                  <Label htmlFor="conservative">Conservative</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive">Aggressive</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold">Investment Timeline</h2>
            <RadioGroup
              value={answers.investmentHorizon}
              onValueChange={(value) =>
                setAnswers({ ...answers, investmentHorizon: value })
              }
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="short" />
                  <Label htmlFor="short">1-3 years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">3-7 years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long" id="long" />
                  <Label htmlFor="long">7+ years</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Complete Your Profile</h1>
        <p className="text-muted-foreground">
          Help us understand your financial goals
        </p>
      </div>
      <div className="flex justify-center space-x-2 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i <= step ? "bg-primary" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      {renderStep()}
      <div className="flex justify-between">
        {step > 1 && (
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
          >
            Back
          </Button>
        )}
        <Button
          onClick={handleNext}
          className={step === 1 ? "w-full" : ""}
        >
          {step === 3 ? "Complete" : "Next"}
        </Button>
      </div>
    </Card>
  );
};