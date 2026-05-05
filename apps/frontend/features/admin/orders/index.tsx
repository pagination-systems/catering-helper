"use client";

import { useMemo } from "react";
import { If } from "@/components/if";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SectionHeader } from "../components/section-header";
import { CancelConfirmation } from "./components/cancel-confirmation";
import { DayTabs } from "./components/day-tabs";
import { DeleteConfirmation } from "./components/delete-confirmation";
import { OrderDetails } from "./components/order-details";
import { OrderForm } from "./components/order-form";
import { OrderTable } from "./components/order-table";
import { TableToolbar } from "./components/table-toolbar";
import { UpdateOrder } from "./components/update-order";
import { useCreateOrder } from "./hooks";
import { useDayCounts } from "./hooks/useDayCounts";
import { useOrders } from "./hooks/useOrders";
import { useOrdersI18n } from "./lib/orders-i18n";
import { getUpcomingDays, useOrdersStore } from "./store/useStore";

interface OrdersProps {
  title?: string;
  description?: string;
  tenantId?: string;
}

export const Orders = ({ title, description, tenantId }: OrdersProps = {}) => {
  const i18n = useOrdersI18n();
  const { orders, pagination, onSearch, handleFilter, handlePagination } = useOrders({ tenantId });
  const upcomingDays = useMemo(() => getUpcomingDays(), []);
  const selectedOrder = useOrdersStore((state) => state.selectedOrder);
  const isCreateSheetOpen = useOrdersStore((state) => state.isCreateSheetOpen);
  const isEditSheetOpen = useOrdersStore((state) => state.isEditSheetOpen);
  const { createOrder } = useCreateOrder();
  const dayCounts = useDayCounts(orders);
  const dayFilter = useOrdersStore((state) => state.dayFilter);
  const setDayFilter = useOrdersStore((state) => state.setDayFilter);

  const isViewSheetOpen = useOrdersStore((state) => state.isViewSheetOpen);
  const selectedViewItem = useOrdersStore((state) => state.selectedViewItem);
  const setCreateSheetOpen = useOrdersStore((state) => state.setCreateSheetOpen);
  const setEditSheetOpen = useOrdersStore((state) => state.setEditSheetOpen);
  const setViewSheetOpen = useOrdersStore((state) => state.setViewSheetOpen);
  const closeCreateSheet = useOrdersStore((state) => state.closeCreateSheet);
  const closeViewSheet = useOrdersStore((state) => state.closeViewSheet);

  return (
    <section className="space-y-4" aria-labelledby="orders-title">
      <If expression={!!title && !!description}>
        <SectionHeader title={i18n.title} description={i18n.description} />
      </If>

      <DayTabs
        activeDay={dayFilter}
        onChange={(daySlot) => {
          if (daySlot === "all") {
            setDayFilter("all");
            handleFilter({ value: {} });
            return;
          }

          setDayFilter(daySlot.day);
          console.log("Filtering by date:", daySlot.date);
          handleFilter({
            value: {
              deliveryDate: daySlot.date,
            },
          });
        }}
        counts={dayCounts}
        upcomingDays={upcomingDays}
      />

      <Card>
        <CardHeader className="space-y-3">
          <TableToolbar orders={orders} activeDay={dayFilter} onSearch={onSearch} />
        </CardHeader>

        <CardContent className="space-y-4">
          <OrderTable data={orders} pagination={pagination} handlePaginate={handlePagination} />
        </CardContent>
      </Card>

      <Sheet open={isCreateSheetOpen} onOpenChange={setCreateSheetOpen}>
        <SheetContent side="right" className="w-full overflow-hidden sm:!max-w-[760px]">
          <SheetHeader>
            <SheetTitle>{i18n.form.createTitle}</SheetTitle>
            <SheetDescription>{i18n.form.createDescription}</SheetDescription>
          </SheetHeader>

          <OrderForm
            onSubmit={(values) => createOrder(values, closeCreateSheet)}
            submitLabel={i18n.form.submitCreate}
            upcomingDays={upcomingDays}
          />
        </SheetContent>
      </Sheet>

      <Sheet open={isEditSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent side="right" className="w-full overflow-hidden sm:!max-w-[760px]">
          <SheetHeader>
            <SheetTitle>{i18n.form.editTitle}</SheetTitle>
            <SheetDescription>{i18n.form.editDescription}</SheetDescription>
          </SheetHeader>

          {selectedOrder && <UpdateOrder selectedOrder={selectedOrder} />}
        </SheetContent>
      </Sheet>

      <Sheet open={isViewSheetOpen} onOpenChange={(open) => (open ? setViewSheetOpen(true) : closeViewSheet())}>
        <SheetContent side="right" className="w-full overflow-auto sm:!max-w-[880px]">
          <SheetHeader>
            <SheetTitle>{i18n.details.title}</SheetTitle>
            <SheetDescription>{i18n.details.description}</SheetDescription>
          </SheetHeader>

          <If
            expression={!!selectedViewItem}
            fallback={<p className="text-sm text-muted-foreground">{i18n.details.noOrder}</p>}
          >
            {selectedViewItem && <OrderDetails id={selectedViewItem.id} />}
          </If>
        </SheetContent>
      </Sheet>

      <DeleteConfirmation />
      <CancelConfirmation />
    </section>
  );
};
