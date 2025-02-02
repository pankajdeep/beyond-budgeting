import { Header } from "@/components/layout/Header";
import { EducationalContent } from "@/components/financial-literacy/EducationalContent";
import { FAQSection } from "@/components/financial-literacy/FAQSection";
import { SearchBar } from "@/components/financial-literacy/SearchBar";

const FinancialLiteracy = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8 mt-16">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Financial Literacy</h1>
          <p className="text-muted-foreground">
            Expand your financial knowledge with educational resources and expert insights
          </p>
        </div>

        <SearchBar />
        <EducationalContent />
        <FAQSection />
      </div>
    </>
  );
};

export default FinancialLiteracy;