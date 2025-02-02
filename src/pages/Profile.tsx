import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/components/profile/UserProfile";
import { Loader } from "@/components/ui/loader";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(user);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <div className="w-full px-4 py-8 space-y-8 mt-16">
        <div className="max-w-[1400px] mx-auto">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="space-y-8">
              <h1 className="text-4xl font-bold">Profile</h1>
              {user ? (
                <UserProfile user={user} />
              ) : (
                <p className="text-muted-foreground">No user data found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
