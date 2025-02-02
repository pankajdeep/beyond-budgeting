import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Shield, ShieldAlert } from "lucide-react";

interface Account {
  account_id: string;
  account_type: string;
  account_number: string;
  balance: number;
  interest_rate: number | null;
}

interface FinancialSummaryProps {
  accounts: Account[];
}

export const FinancialSummary = ({ accounts }: FinancialSummaryProps) => {
  const maskAccountNumber = (number: string) => {
    return "****" + number.slice(-4);
  };

  const getAccountHealth = (balance: number, type: string) => {
    if (type === "Chequing" && balance < 1000) return "warning";
    if (type === "Savings" && balance < 5000) return "warning";
    return "good";
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn justify-items-center">
        {accounts.map((account) => {
          const health = getAccountHealth(account.balance, account.account_type);
          const isPositive = account.balance > 0;

          return (
            <Card 
              key={account.account_id}
              className="w-full max-w-sm p-6 hover:shadow-lg transition-shadow duration-200 bg-white/10 backdrop-blur-lg border border-white/20 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-primary">
                      {account.account_type}
                    </h3>
                    <p className="text-sm text-primary-200">
                      {maskAccountNumber(account.account_number)}
                    </p>
                  </div>
                  {health === "good" ? (
                    <Shield className="h-5 w-5 text-success-500" />
                  ) : (
                    <ShieldAlert className="h-5 w-5 text-destructive" />
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(account.balance)}
                  </p>
                  <div className="flex items-center space-x-2">
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 text-success-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span className={`text-sm ${isPositive ? 'text-success-500' : 'text-destructive'}`}>
                      {account.interest_rate ? `${account.interest_rate}% APY` : 'No interest rate'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};