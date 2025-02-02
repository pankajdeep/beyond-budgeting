import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { DollarSign, TrendingUp, Shield } from "lucide-react";

const riskLevels = {
  low: {
    allocation: [
      { name: "Bonds", value: 60, color: "#4CAF50" },
      { name: "Stocks", value: 30, color: "#2196F3" },
      { name: "Cash", value: 10, color: "#FFC107" },
    ],
    expectedReturn: "4-6%",
    riskScore: 30,
  },
  medium: {
    allocation: [
      { name: "Bonds", value: 40, color: "#4CAF50" },
      { name: "Stocks", value: 50, color: "#2196F3" },
      { name: "Cash", value: 10, color: "#FFC107" },
    ],
    expectedReturn: "6-8%",
    riskScore: 60,
  },
  high: {
    allocation: [
      { name: "Bonds", value: 20, color: "#4CAF50" },
      { name: "Stocks", value: 70, color: "#2196F3" },
      { name: "Cash", value: 10, color: "#FFC107" },
    ],
    expectedReturn: "8-12%",
    riskScore: 90,
  },
};

export const InvestmentPortfolio = () => {
  const [selectedRisk, setSelectedRisk] = useState<keyof typeof riskLevels>("medium");

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-primary" />
          Investment Portfolio
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {(Object.keys(riskLevels) as Array<keyof typeof riskLevels>).map((risk) => (
            <Toggle
              key={risk}
              pressed={selectedRisk === risk}
              onPressedChange={() => setSelectedRisk(risk)}
              className="capitalize"
            >
              {risk} Risk
            </Toggle>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Risk Level</span>
              </div>
              <Progress value={riskLevels[selectedRisk].riskScore} className="w-32" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Expected Return</span>
              </div>
              <span className="font-medium text-primary">
                {riskLevels[selectedRisk].expectedReturn}
              </span>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskLevels[selectedRisk].allocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskLevels[selectedRisk].allocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};