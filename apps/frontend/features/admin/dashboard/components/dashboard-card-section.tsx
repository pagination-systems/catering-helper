import type { ReactNode } from "react";

import { CardItem } from "./card-item";

type DashboardCard = {
  title: string;
  value: string | number;
  link?: string;
  icon?: ReactNode;
};

interface DashboardCardSectionProps {
  title: string;
  cards: DashboardCard[];
}

export const DashboardCardSection = ({ title, cards }: DashboardCardSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <CardItem key={card.title} title={card.title} value={card.value} link={card.link} icon={card.icon} />
        ))}
      </div>
    </div>
  );
};
