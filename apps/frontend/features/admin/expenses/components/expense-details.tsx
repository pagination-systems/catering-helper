"use client";

import { CalendarIcon, FileTextIcon, ListIcon, TagIcon, WalletIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { IExpense } from "../schemas/expense.schema";
import { getCategoryBadgeStyles } from "../utils/badge";

export const ExpenseDetails = ({ item }: { item: IExpense }) => {
  return (
    <Card className="overflow-hidden border-border/50 shadow-sm">
      <CardContent className="p-0">
        <div className="flex flex-col divide-y divide-border/50">
          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors">
            <div className="flex items-center gap-2 text-muted-foreground sm:w-48">
              <TagIcon className="h-4 w-4" />
              <p className="text-xs font-medium uppercase tracking-wider">Label</p>
            </div>
            <p className="text-base font-semibold text-foreground sm:text-right flex-1">{item.label}</p>
          </div>

          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors">
            <div className="flex items-center gap-2 text-muted-foreground sm:w-48">
              <ListIcon className="h-4 w-4" />
              <p className="text-xs font-medium uppercase tracking-wider">Category</p>
            </div>
            <div className="sm:text-right flex-1">
              <Badge variant="outline" className={getCategoryBadgeStyles(item.category)}>
                {item.category}
              </Badge>
            </div>
          </div>

          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors">
            <div className="flex items-center gap-2 text-muted-foreground sm:w-48">
              <CalendarIcon className="h-4 w-4" />
              <p className="text-xs font-medium uppercase tracking-wider">Date</p>
            </div>
            <p className="text-sm font-medium sm:text-right flex-1">{formatDate(item.date)}</p>
          </div>

          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/5 hover:bg-muted/10 transition-colors">
            <div className="flex items-center gap-2 text-muted-foreground sm:w-48">
              <WalletIcon className="h-4 w-4" />
              <p className="text-xs font-medium uppercase tracking-wider">Amount</p>
            </div>
            <p className="text-2xl font-bold tracking-tight text-primary sm:text-right flex-1">
              {formatCurrency(item.amount)}
            </p>
          </div>

          {item.description && (
            <div className="p-5 flex flex-col gap-3 hover:bg-muted/10 transition-colors">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileTextIcon className="h-4 w-4" />
                <p className="text-xs font-medium uppercase tracking-wider">Description</p>
              </div>
              <div className="p-4 bg-background rounded-md border border-border/50 shadow-sm">
                <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">{item.description}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
