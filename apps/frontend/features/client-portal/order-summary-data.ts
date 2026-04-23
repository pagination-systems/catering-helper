import { useMemo } from 'react';
import type { Language } from '@/lib/i18n';

import { getUpcomingDays } from './components/utils';
import { createQuantityKey, useClientPortalStore } from './store';
import { dayOrder, packages, type DayName } from './data';

export type OrderRow = {
  key: string;
  pkgId: string;
  variantId: string;
  packageName: string;
  day: DayName;
  label: string;
  items: string[];
  quantity: number;
  subtotal: number;
};

export type GroupedOrder = {
  day: DayName;
  dateLabel: string;
  items: OrderRow[];
  subTotal: number;
};

export function useOrderSummaryData(language: Language) {
  const packageSelections = useClientPortalStore((state) => state.packageSelections);

  const upcomingDays = useMemo(() => getUpcomingDays(language), [language]);

  const orderRows = useMemo<OrderRow[]>(() => {
    const rows: OrderRow[] = [];

    packages.forEach((pkg) => {
      const selection = packageSelections[pkg.id] || { quantities: {} };

      pkg.days.forEach((dayMenu) => {
        dayMenu.variants.forEach((variant) => {
          const qty = selection.quantities[createQuantityKey(dayMenu.day, variant.id)] ?? 0;

          if (qty > 0) {
            rows.push({
              key: `${pkg.id}::${dayMenu.day}::${variant.id}`,
              pkgId: pkg.id,
              variantId: variant.id,
              packageName: pkg.name,
              day: dayMenu.day,
              label: variant.name,
              items: variant.items,
              quantity: qty,
              subtotal: qty * pkg.pricePerMeal,
            });
          }
        });
      });
    });

    return rows.sort(
      (a, b) => a.packageName.localeCompare(b.packageName) || dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day),
    );
  }, [packageSelections]);

  const groupedOrders = useMemo<GroupedOrder[]>(() => {
    const grouped: Record<DayName, GroupedOrder> = {} as Record<DayName, GroupedOrder>;

    orderRows.forEach((row) => {
      if (!grouped[row.day]) {
        const dayInfo = upcomingDays.find((d) => d.day === row.day);
        grouped[row.day] = {
          day: row.day,
          dateLabel: dayInfo?.dateLabel || '',
          items: [],
          subTotal: 0,
        };
      }

      grouped[row.day].items.push(row);
      grouped[row.day].subTotal += row.subtotal;
    });

    return Object.values(grouped).sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
  }, [orderRows, upcomingDays]);

  const subtotal = useMemo(() => orderRows.reduce((sum, row) => sum + row.subtotal, 0), [orderRows]);
  const totalQuantity = useMemo(() => orderRows.reduce((sum, row) => sum + row.quantity, 0), [orderRows]);

  return {
    orderRows,
    groupedOrders,
    subtotal,
    totalQuantity,
  };
}
