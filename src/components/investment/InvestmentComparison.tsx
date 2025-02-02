import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const investmentTypes = [
  {
    type: "Stocks",
    risk: "High",
    roi: "8-12%",
    liquidity: "High",
    growth: "High",
    description: "Direct ownership in companies with high growth potential but higher risk",
  },
  {
    type: "Mutual Funds",
    risk: "Medium",
    roi: "6-10%",
    liquidity: "Medium",
    growth: "Medium",
    description: "Professionally managed investment pools with diversified holdings",
  },
  {
    type: "Bonds",
    risk: "Low",
    roi: "3-6%",
    liquidity: "Medium",
    growth: "Low",
    description: "Fixed-income securities with regular interest payments",
  },
  {
    type: "ETFs",
    risk: "Medium",
    roi: "5-10%",
    liquidity: "High",
    growth: "Medium",
    description: "Index-tracking funds traded like stocks with lower fees",
  },
];

const getRiskBadge = (risk: string) => {
  const variants = {
    Low: "bg-success-500 hover:bg-success-600",
    Medium: "bg-yellow-500 hover:bg-yellow-600",
    High: "bg-red-500 hover:bg-red-600",
  };
  return (
    <Badge className={`${variants[risk as keyof typeof variants]} text-white`}>
      {risk}
    </Badge>
  );
};

export const InvestmentComparison = () => {
  return (
    <Card className="animate-fadeIn">
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="cards">Card View</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Expected ROI</TableHead>
                <TableHead>Liquidity</TableHead>
                <TableHead>Growth Potential</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investmentTypes.map((investment) => (
                <TableRow key={investment.type}>
                  <TableCell className="font-medium">{investment.type}</TableCell>
                  <TableCell>{getRiskBadge(investment.risk)}</TableCell>
                  <TableCell>{investment.roi}</TableCell>
                  <TableCell>{investment.liquidity}</TableCell>
                  <TableCell>{investment.growth}</TableCell>
                  <TableCell className="max-w-xs">{investment.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="cards">
          <div className="grid md:grid-cols-2 gap-4 p-4">
            {investmentTypes.map((investment) => (
              <Card key={investment.type} className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{investment.type}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    {getRiskBadge(investment.risk)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected ROI:</span>
                    <span>{investment.roi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Liquidity:</span>
                    <span>{investment.liquidity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Growth Potential:</span>
                    <span>{investment.growth}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{investment.description}</p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};