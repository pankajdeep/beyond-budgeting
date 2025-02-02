import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "How much should I save for retirement?",
    answer: "The amount you should save for retirement depends on various factors including your current age, desired retirement age, and lifestyle. A general rule of thumb is to save 10-15% of your gross income for retirement, but it's best to consult with a financial advisor for personalized advice.",
  },
  {
    question: "What's the difference between a TFSA and an RRSP?",
    answer: "TFSAs and RRSPs are both tax-advantaged accounts but serve different purposes. TFSA contributions are made with after-tax dollars and withdrawals are tax-free. RRSP contributions are tax-deductible, but withdrawals are taxed as income.",
  },
  {
    question: "How do I start investing?",
    answer: "Start by setting clear financial goals, understanding your risk tolerance, and creating a diversified portfolio. Consider starting with low-cost index funds or ETFs, and gradually expand your investment knowledge and portfolio.",
  },
  {
    question: "What's the best way to pay off debt?",
    answer: "Two popular strategies are the avalanche method (paying off highest interest debt first) and the snowball method (paying off smallest debts first). Choose the method that best fits your financial situation and motivation style.",
  },
];

export const FAQSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
      <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
};