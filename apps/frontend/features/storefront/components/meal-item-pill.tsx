import { Badge } from "@/components/ui/badge";

export function MealItemPill({ label }: { label: string }) {
  return (
    <Badge variant="outline" className="text-xs font-normal">
      {label}
    </Badge>
  );
}
