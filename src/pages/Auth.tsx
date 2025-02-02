import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const isSignUp = location.pathname === "/signup";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      {isSignUp ? <SignUpForm /> : <SignInForm />}
    </div>
  );
};

export default Auth;