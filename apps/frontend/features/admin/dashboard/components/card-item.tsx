"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { If } from "@/components/if";
import { Card } from "@/components/ui/card";

interface CardItemProps {
  title: string;
  value: string | number;
  link?: string;
  icon?: ReactNode;
}

export const CardItem = ({ title, value, link, icon }: CardItemProps) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => link && router.push(link)}
      className={`flex flex-row items-center gap-4 p-7 transition-all duration-200 ${
        link ? "cursor-pointer hover:shadow-md hover:border-primary/50" : ""
      }`}
      {...(link && { role: "button", tabIndex: 0 })}
      aria-label={`${title}: ${value}${link ? ` - Navigate to details` : ""}`}
    >
      <If expression={icon}>
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {icon}
        </div>
      </If>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
      </div>
    </Card>
  );
};
