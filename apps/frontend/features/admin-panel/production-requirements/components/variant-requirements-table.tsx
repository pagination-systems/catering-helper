"use client";

import type { VariantRequirement } from "../schemas/production.schema";

interface VariantRequirementsTableProps {
  variants: VariantRequirement[];
}

export const VariantRequirementsTable = ({ variants }: VariantRequirementsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Variant</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Food Items</th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Meals</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant.variantName} className="border-b border-border/50 last:border-b-0 hover:bg-muted/30">
              <td className="px-4 py-3">
                <p className="font-medium text-foreground">{variant.variantName}</p>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {variant.items.map((item) => (
                    <span
                      key={item}
                      className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-blue-100 px-2 text-sm font-semibold text-blue-900">
                  {variant.totalQuantity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
