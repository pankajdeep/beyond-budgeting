import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};