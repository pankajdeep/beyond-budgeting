import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Wallet, ChartBarIcon, MessageSquare, Sun } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Animate elements on page load
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((element) => {
      element.classList.add('animate-fadeIn');
    });
  }, []);

  const features = [
    {
      icon: <Wallet className="w-12 h-12 text-[#FFCD00]" />,
      title: "Personalized Budgeting",
      description: "Smart AI-driven insights to optimize your spending and savings"
    },
    {
      icon: <ChartBarIcon className="w-12 h-12 text-[#FFCD00]" />,
      title: "Smart Investment Guidance",
      description: "Data-driven recommendations to grow your wealth effectively"
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-[#FFCD00]" />,
      title: "AI-Powered Financial Advice",
      description: "24/7 intelligent assistance for your financial decisions"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "This AI companion transformed how I manage my business finances. The insights are invaluable!"
    },
    {
      name: "Michael Chen",
      role: "Tech Professional",
      content: "The investment guidance helped me make informed decisions. My portfolio has never looked better."
    },
    {
      name: "Emma Davis",
      role: "Freelancer",
      content: "Finally, an app that understands my irregular income pattern and helps me budget effectively."
    }
  ];

  return (
    <div className="min-h-screen bg-[#003366] text-white font-roboto">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#003366] to-[#001830] opacity-90" />
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-on-load">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Empower Your Financial Future with AI
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fadeIn delay-200">
            Smart budgeting, personalized investment guidance, and expert financial insights—all in one place.
          </p>
          <Button
            onClick={() => navigate("/signup")}
            className="bg-[#FFCD00] hover:bg-[#FFD700] text-[#003366] text-lg px-8 py-6 rounded-full transform transition-all duration-200 hover:scale-105 animate-fadeIn delay-300"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#003366] mb-12">
            Revolutionize Your Financial Journey
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/3">
                  <Card className="p-6 h-full bg-[#F5F5F5] border-none hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-2 text-[#003366]">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sun className="w-16 h-16 text-[#FFCD00] mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-8">
            Why Choose Our AI Companion?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-[#003366] mb-4">Advanced AI Technology</h3>
              <p className="text-gray-600">Cutting-edge algorithms that learn and adapt to your financial patterns</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-[#003366] mb-4">Personalized Insights</h3>
              <p className="text-gray-600">Tailored recommendations based on your unique financial situation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#003366] mb-12">
            What Our Users Say
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <Card className="p-6 h-full bg-[#F5F5F5] border-none">
                    <div className="flex flex-col h-full">
                      <p className="text-gray-600 mb-4 flex-grow">{testimonial.content}</p>
                      <div>
                        <p className="font-semibold text-[#003366]">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003366] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#FFCD00] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#FFCD00] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#FFCD00] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#FFCD00] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#FFCD00] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#FFCD00] transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#FFCD00] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#FFCD00] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#FFCD00] transition-colors">FAQs</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-700">
            <p>&copy; 2024 Money Mindfully. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg transform translate-y-full animate-slideUp md:hidden">
        <Button
          onClick={() => navigate("/signup")}
          className="w-full bg-[#FFCD00] hover:bg-[#FFD700] text-[#003366]"
        >
          Get Started Now
        </Button>
      </div>
    </div>
  );
};

export default Index;