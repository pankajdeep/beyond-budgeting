import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { BarChart } from "lucide-react";

const investmentTypes = [
  {
    type: "Stocks",
    risk: "High",
    roi: "10-15%",
    liquidity: "High",
    growth: "High",
    description: "Direct ownership in companies",
  },
  {
    type: "Mutual Funds",
    risk: "Medium",
    roi: "8-12%",
    liquidity: "Medium",
    growth: "Medium",
    description: "Professionally managed investment pools",
  },
  {
    type: "Bonds",
    risk: "Low",
    roi: "4-6%",
    liquidity: "Medium",
    growth: "Low",
    description: "Fixed-income debt securities",
  },
  {
    type: "ETFs",
    risk: "Medium",
    roi: "8-12%",
    liquidity: "High",
    growth: "Medium",
    description: "Exchange-traded investment funds",
  },
];

// Define metrics as a regular array instead of a readonly tuple
const metrics = ["risk", "roi", "liquidity", "growth"] as const;
type MetricType = typeof metrics[number];

export const InvestmentComparison = () => {
  const [selectedMetrics, setSelectedMetrics] = useState<MetricType[]>(Array.from(metrics));

  const toggleMetric = (metric: MetricType) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn delay-300">
      <div className="flex items-center gap-2">
        <BarChart className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Investment Types Comparison</h2>
      </div>

      <div className="flex flex-wrap gap-4">
        {metrics.map((metric) => (
          <Toggle
            key={metric}
            pressed={selectedMetrics.includes(metric)}
            onPressedChange={() => toggleMetric(metric)}
            className="capitalize"
          >
            {metric}
          </Toggle>
        ))}
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              {selectedMetrics.map((metric) => (
                <TableHead key={metric} className="capitalize">
                  {metric}
                </TableHead>
              ))}
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investmentTypes.map((investment) => (
              <TableRow key={investment.type}>
                <TableCell className="font-medium">{investment.type}</TableCell>
                {selectedMetrics.map((metric) => (
                  <TableCell key={metric}>
                    <Badge
                      variant={
                        investment[metric] === "High"
                          ? "default"
                          : investment[metric] === "Medium"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {investment[metric]}
                    </Badge>
                  </TableCell>
                ))}
                <TableCell>{investment.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};