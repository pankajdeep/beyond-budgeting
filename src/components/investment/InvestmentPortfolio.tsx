import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useState } from "react";
import { Shield, TrendingUp, DollarSign } from "lucide-react";

const riskLevels = {
  low: {
    data: [
      { name: "Bonds", value: 60 },
      { name: "Stocks", value: 20 },
      { name: "Cash", value: 20 },
    ],
    expectedReturn: "4-6%",
    riskScore: 30,
  },
  medium: {
    data: [
      { name: "Bonds", value: 40 },
      { name: "Stocks", value: 40 },
      { name: "Cash", value: 20 },
    ],
    expectedReturn: "6-8%",
    riskScore: 60,
  },
  high: {
    data: [
      { name: "Bonds", value: 20 },
      { name: "Stocks", value: 70 },
      { name: "Cash", value: 10 },
    ],
    expectedReturn: "8-12%",
    riskScore: 90,
  },
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export const InvestmentPortfolio = () => {
  const [riskLevel, setRiskLevel] = useState<keyof typeof riskLevels>("medium");

  const getRiskColor = (score: number) => {
    if (score < 40) return "bg-success-500";
    if (score < 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">Portfolio Breakdown</h3>
          <div className="flex items-center space-x-2">
            <Label htmlFor="risk-toggle">High Risk</Label>
            <Switch
              id="risk-toggle"
              checked={riskLevel === "high"}
              onCheckedChange={(checked) =>
                setRiskLevel(checked ? "high" : "medium")
              }
            />
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskLevels[riskLevel].data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskLevels[riskLevel].data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 animate-fadeIn delay-200">
        <h3 className="text-2xl font-semibold mb-6">Risk Assessment</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Risk Level</span>
              <span className="font-medium">{riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}</span>
            </div>
            <Progress
              value={riskLevels[riskLevel].riskScore}
              className={getRiskColor(riskLevels[riskLevel].riskScore)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-secondary/10 rounded-lg space-y-2">
              <Shield className="h-6 w-6 text-primary" />
              <h4 className="font-medium">Risk Level</h4>
              <p className="text-2xl font-bold">{riskLevel.toUpperCase()}</p>
            </div>
            
            <div className="p-4 bg-secondary/10 rounded-lg space-y-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h4 className="font-medium">Expected Return</h4>
              <p className="text-2xl font-bold">{riskLevels[riskLevel].expectedReturn}</p>
            </div>
            
            <div className="p-4 bg-secondary/10 rounded-lg space-y-2">
              <DollarSign className="h-6 w-6 text-primary" />
              <h4 className="font-medium">Min Investment</h4>
              <p className="text-2xl font-bold">$500</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};