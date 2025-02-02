import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

interface Transaction {
  transaction_id: string;
  amount: number;
  description: string;
  category: string;
  transaction_date: string;
  transaction_type: string;
  user_accounts: {
    account_type: string;
    account_number: string;
  };
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <Card className="p-6 animate-fadeIn bg-white/10 backdrop-blur-lg border border-white/20">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Recent Transactions</h3>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-primary">Date</TableHead>
                <TableHead className="text-primary">Description</TableHead>
                <TableHead className="text-primary">Category</TableHead>
                <TableHead className="text-primary">Account</TableHead>
                <TableHead className="text-right text-primary">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.transaction_id} className="border-white/10">
                  <TableCell className="text-white">
                    {format(new Date(transaction.transaction_date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-white">{transaction.description}</TableCell>
                  <TableCell className="text-white">{transaction.category}</TableCell>
                  <TableCell className="text-white">{transaction.user_accounts.account_type}</TableCell>
                  <TableCell className={`text-right ${
                    transaction.transaction_type === 'Deposit' 
                      ? 'text-success-500' 
                      : 'text-destructive'
                  }`}>
                    {transaction.transaction_type === 'Deposit' ? '+' : '-'}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};