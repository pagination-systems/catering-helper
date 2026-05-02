"use client";

import { ORDER_STATUS_ENUM } from "@catering/types";
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
import { getPriceByPackageName } from "./data/package-catalog";
import { useOrdersI18n } from "./lib/orders-i18n";
import type { CreateOrderValues, DayName, IOrder } from "./schemas/order.schema";
import { useOrdersStore } from "./store/useStore";

const buildPagination = (totalDocs: number) => ({
  totalDocs,
  limit: 10,
  hasPrevPage: false,
  hasNextPage: false,
  page: 1,
  totalPages: Math.max(1, Math.ceil(totalDocs / 10)),
  prevPage: null,
  nextPage: null,
  pagingCounter: 1,
});

const createOrderNumber = () => {
  const now = new Date();

  const y = String(now.getFullYear()).slice(2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const random = String(Math.floor(1000 + Math.random() * 9000));

  return `ORD-${y}${m}${d}-${random}`;
};

const formatDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getDeliverySlotFromValue = (upcomingDays: { day: DayName; date: Date }[], deliveryDate: string) => {
  return upcomingDays.find((slot) => formatDateValue(slot.date) === deliveryDate) ?? upcomingDays[0];
};

const buildFormValuesFromOrder = (order: IOrder): CreateOrderValues => {
  const firstItem = order.items[0];

  return {
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    address: order.address,
    notes: order.notes,
    packageName: firstItem?.packageName ?? "",
    deliveryDate: formatDateValue(order.deliveryDate),
    items: order.items.map((item) => ({
      packageName: item.packageName,
      variantName: item.variantName,
      quantity: item.quantity,
      deliveryDate: formatDateValue(item.deliveryDate ?? order.deliveryDate),
    })),
  };
};

export const Orders = () => {
  const i18n = useOrdersI18n();
  const data = useOrdersStore((state) => state.list);
  const upcomingDays = useOrdersStore((state) => state.upcomingDays);
  const query = useOrdersStore((state) => state.query);
  const statusFilter = useOrdersStore((state) => state.statusFilter);
  const dayFilter = useOrdersStore((state) => state.dayFilter);
  const addItem = useOrdersStore((state) => state.addItem);
  const updateOrder = useOrdersStore((state) => state.updateOrder);
  const setDayFilter = useOrdersStore((state) => state.setDayFilter);
  const isCreateSheetOpen = useOrdersStore((state) => state.isCreateSheetOpen);
  const isEditSheetOpen = useOrdersStore((state) => state.isEditSheetOpen);
  const isViewSheetOpen = useOrdersStore((state) => state.isViewSheetOpen);
  const selectedItem = useOrdersStore((state) => state.selectedItem);
  const selectedViewItem = useOrdersStore((state) => state.selectedViewItem);
  const setCreateSheetOpen = useOrdersStore((state) => state.setCreateSheetOpen);
  const setEditSheetOpen = useOrdersStore((state) => state.setEditSheetOpen);
  const setViewSheetOpen = useOrdersStore((state) => state.setViewSheetOpen);
  const closeCreateSheet = useOrdersStore((state) => state.closeCreateSheet);
  const closeEditSheet = useOrdersStore((state) => state.closeEditSheet);
  const closeViewSheet = useOrdersStore((state) => state.closeViewSheet);

  const dayCounts = useMemo(() => {
    return data.data.reduce(
      (acc, order) => {
        acc[order.deliveryDay] = (acc[order.deliveryDay] ?? 0) + 1;
        return acc;
      },
      {} as Partial<Record<DayName, number>>,
    );
  }, [data.data]);

  const filteredOrders = useMemo(() => {
    const queryText = query.trim().toLowerCase();

    return data.data.filter((order) => {
      if (statusFilter !== "all" && order.status !== statusFilter) {
        return false;
      }

      if (dayFilter !== "all" && order.deliveryDay !== dayFilter) {
        return false;
      }

      if (!queryText) {
        return true;
      }

      const searchable = [
        order.orderNo,
        order.customerName,
        order.customerPhone,
        order.address,
        ...order.items.flatMap((item) => [item.packageName, item.variantName, ...item.items]),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(queryText);
    });
  }, [data.data, dayFilter, query, statusFilter]);

  const filteredData = useMemo(
    () => ({
      data: filteredOrders,
      meta: {
        pagination: buildPagination(filteredOrders.length),
      },
    }),
    [filteredOrders],
  );

  const onSubmitCreateOrder = (values: CreateOrderValues) => {
    const now = new Date();
    const deliverySlot = getDeliverySlotFromValue(upcomingDays, values.deliveryDate);
    const deliveryFee = 60;
    const nextItems = values.items.map((item) => {
      const itemDeliverySlot = getDeliverySlotFromValue(upcomingDays, item.deliveryDate);
      const pricePerMeal = getPriceByPackageName(item.packageName);

      return {
        id: crypto.randomUUID(),
        packageName: item.packageName,
        variantName: item.variantName,
        quantity: item.quantity,
        pricePerMeal,
        subtotal: item.quantity * pricePerMeal,
        items: ["Rice", "Dal", "Salad"],
        deliveryDate: itemDeliverySlot?.date ?? deliverySlot?.date ?? now,
      };
    });

    const subtotal = nextItems.reduce((sum, item) => sum + item.subtotal, 0);
    const mealCount = nextItems.reduce((sum, item) => sum + item.quantity, 0);

    const newOrder: IOrder = {
      id: crypto.randomUUID(),
      orderNo: createOrderNumber(),
      customerName: values.customerName,
      customerPhone: values.customerPhone,
      address: values.address,
      notes: values.notes ?? "",
      source: "Admin Panel",
      status: ORDER_STATUS_ENUM.CONFIRMED,
      deliveryDay: deliverySlot?.day ?? "Sun",
      deliveryDate: deliverySlot?.date ?? now,
      items: nextItems,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      totalMeals: mealCount,
      createdAt: now,
      updatedAt: now,
    };

    addItem(newOrder);
    closeCreateSheet();
  };

  const onSubmitEditOrder = (values: CreateOrderValues) => {
    if (!selectedItem) return;

    updateOrder(selectedItem.id, values);
    closeEditSheet();
  };

  return (
    <section className="space-y-4" aria-labelledby="orders-title">
      <SectionHeader title={i18n.title} description={i18n.description} />

      <DayTabs upcomingDays={upcomingDays} activeDay={dayFilter} onChange={setDayFilter} counts={dayCounts} />

      <Card>
        <CardHeader className="space-y-3">
          <TableToolbar filteredOrders={filteredOrders} activeDay={dayFilter} />
        </CardHeader>

        <CardContent className="space-y-4">
          <OrderTable data={filteredData} />
        </CardContent>
      </Card>

      <Sheet open={isCreateSheetOpen} onOpenChange={setCreateSheetOpen}>
        <SheetContent side="right" className="w-full overflow-hidden sm:!max-w-[760px]">
          <SheetHeader>
            <SheetTitle>{i18n.form.createTitle}</SheetTitle>
            <SheetDescription>{i18n.form.createDescription}</SheetDescription>
          </SheetHeader>

          <OrderForm onSubmit={onSubmitCreateOrder} submitLabel={i18n.form.submitCreate} upcomingDays={upcomingDays} />
        </SheetContent>
      </Sheet>

      <Sheet open={isEditSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent side="right" className="w-full overflow-hidden sm:!max-w-[760px]">
          <SheetHeader>
            <SheetTitle>{i18n.form.editTitle}</SheetTitle>
            <SheetDescription>{i18n.form.editDescription}</SheetDescription>
          </SheetHeader>

          <OrderForm
            onSubmit={onSubmitEditOrder}
            initialValues={selectedItem ? buildFormValuesFromOrder(selectedItem) : undefined}
            submitLabel={i18n.form.submitSave}
            upcomingDays={upcomingDays}
          />
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
            {selectedViewItem && <OrderDetails item={selectedViewItem} />}
          </If>
        </SheetContent>
      </Sheet>

      <DeleteConfirmation />
      <CancelConfirmation />
    </section>
  );
};
