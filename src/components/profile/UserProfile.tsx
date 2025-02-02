import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon } from "lucide-react";

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage 
            src="https://images.unsplash.com/photo-1461988091159-192b6df7054f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fG1pbmltYWxpc3RpY3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Profile picture"
          />
          <AvatarFallback>
            <UserIcon className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">{user.email}</h2>
          <p className="text-sm text-muted-foreground">
            Member since {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Account Details</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-muted-foreground">Email:</span>
            <span>{user.email}</span>
            <span className="text-muted-foreground">Last Sign In:</span>
            <span>{new Date(user.last_sign_in_at || "").toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};