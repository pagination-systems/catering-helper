"use client";

import { ClipboardListIcon } from "lucide-react";
import { useProductionRequirementsI18n } from "../lib/production-requirements-i18n";

export const EmptyProductionRequirements = () => {
  const i18n = useProductionRequirementsI18n();

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-12">
      <ClipboardListIcon className="mb-4 h-12 w-12 text-muted-foreground/40" />
      <h3 className="text-lg font-semibold text-muted-foreground">{i18n.empty.noOrdersTitle}</h3>
      <p className="mt-2 text-center text-sm text-muted-foreground/80">{i18n.empty.noOrdersDescription}</p>
    </div>
  );
};
