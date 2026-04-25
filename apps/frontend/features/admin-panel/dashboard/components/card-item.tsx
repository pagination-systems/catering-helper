import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CardItemProps {
  title: string;
  value: string;
  link: string;
}

export const CardItem = ({ title, value, link }: CardItemProps) => {
  return (
    <Card className="border-border/70">
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={link} className="text-xs text-muted-foreground hover:text-primary">
          View Details
        </Link>
      </CardContent>
    </Card>
  );
};
