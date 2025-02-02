import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseCharts } from "@/components/budget/ExpenseCharts";
import { BudgetSuggestions } from "@/components/budget/BudgetSuggestions";
import { ProductRecommendations } from "@/components/budget/ProductRecommendations";
import { Header } from "@/components/layout/Header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Budget = () => {
  const [selectedAccount, setSelectedAccount] = useState<string>("");

  const { data: accounts, isLoading } = useQuery({
    queryKey: ['userAccounts'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const { data, error } = await supabase
        .from('user_accounts')
        .select('*')
        .eq('customer_id', user.id);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <Header />
      <div className="w-full px-4 py-8 space-y-8 animate-fadeIn mt-16">
        <div className="max-w-[1400px] mx-auto space-y-2">
          <h1 className="text-4xl font-bold text-[#ffcb05]">
            Budget & Expenses
          </h1>
          <p className="text-muted-foreground hover:text-secondary transition-colors duration-300">
            Track your spending and get personalized financial insights
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto">
          <Tabs defaultValue="charts" className="space-y-4">
            <TabsList className="space-x-2">
              <TabsTrigger value="charts" className="tab-trigger">
                Expense Analysis
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="tab-trigger">
                AI-Powered Budget Insights
              </TabsTrigger>
              <TabsTrigger value="products" className="tab-trigger">
                Product Recommendations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="charts" className="space-y-4">
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-[#ffcb05]">
                    Expense Overview
                  </h2>
                  <div className="w-[200px]">
                    <Select
                      value={selectedAccount}
                      onValueChange={setSelectedAccount}
                    >
                      <SelectTrigger className="hover:border-[#0f434e] transition-colors duration-300">
                        <SelectValue placeholder={isLoading ? "Loading..." : "Select account"} />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts?.map((account) => (
                          <SelectItem 
                            key={account.account_id} 
                            value={account.account_id}
                            className="hover:bg-[#0f434e]/10 transition-colors duration-300"
                          >
                            {account.account_type} - {account.account_number}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <ExpenseCharts accountId={selectedAccount} />
              </Card>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-4">
              <BudgetSuggestions />
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <ProductRecommendations />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Budget;