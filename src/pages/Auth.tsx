import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const isSignUp = location.pathname === "/signup";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-md mx-auto px-4">
        {isSignUp ? <SignUpForm /> : <SignInForm />}
      </div>
    </div>
  );
};

export default Auth;