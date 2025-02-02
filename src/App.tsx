import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Budget from "./pages/Budget";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return null; // or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              {isAuthenticated && <AppSidebar />}
              <Routes>
                <Route
                  path="/"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <Index />
                    )
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    isAuthenticated ? (
                      <Dashboard />
                    ) : (
                      <Navigate to="/signin" replace />
                    )
                  }
                />
                <Route
                  path="/budget"
                  element={
                    isAuthenticated ? (
                      <Budget />
                    ) : (
                      <Navigate to="/signin" replace />
                    )
                  }
                />
                <Route
                  path="/profile"
                  element={
                    isAuthenticated ? (
                      <Profile />
                    ) : (
                      <Navigate to="/signin" replace />
                    )
                  }
                />
                <Route
                  path="/settings"
                  element={
                    isAuthenticated ? (
                      <Settings />
                    ) : (
                      <Navigate to="/signin" replace />
                    )
                  }
                />
                <Route
                  path="/onboarding"
                  element={
                    isAuthenticated ? (
                      <Onboarding />
                    ) : (
                      <Navigate to="/signin" replace />
                    )
                  }
                />
                <Route path="/signin" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;