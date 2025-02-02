import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Upload } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";

const Profile = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      console.log("Fetching profile data...");
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/signin");
        return null;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in mt-16">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        
        <Card className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Avatar className="h-24 w-24">
                  <AvatarImage 
                    src="https://images.unsplash.com/photo-1439337153520-7082a56a81f4"
                    alt="Profile picture"
                  />
                  <AvatarFallback>
                    {profile?.full_name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{profile?.full_name}</h2>
                <p className="text-muted-foreground">{profile?.occupation}</p>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-muted-foreground">Age</label>
                  <p>{profile?.age}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Occupation</label>
                  <p>{profile?.occupation}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Financial Information</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-muted-foreground">Monthly Income</label>
                  <p>${profile?.monthly_income?.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Monthly Expenses</label>
                  <p>${profile?.monthly_expenses?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Profile;