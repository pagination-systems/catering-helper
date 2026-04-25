import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CardItemProps {
  title: string;
  value: string;
  link: string;
}

export const CardItem = ({ title, value }: CardItemProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
};
