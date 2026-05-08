import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cn("flex h-32 items-center justify-center", className)}>
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};
