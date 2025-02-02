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
    <Card className="p-6 animate-fadeIn">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.transaction_id}>
                  <TableCell>
                    {format(new Date(transaction.transaction_date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.user_accounts.account_type}</TableCell>
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