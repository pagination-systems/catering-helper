"use client";

import { ORDER_SOURCE_ENUM } from "@catering/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatCurrency, formatDateValue } from "@/lib/utils";
import {
  adminPackageCatalog,
  getPackageByName,
  getPriceByPackageName,
  getVariantsByPackageName,
} from "../data/package-catalog";
import { interpolate, useOrdersI18n } from "../lib/orders-i18n";
import { type IOrder, type OrderFormInput, orderFormSchema } from "../schemas/order.schema";
import type { DaySlot } from "../store/useStore";
import { DayTab } from "./day-tab";

interface OrderFormProps {
  onSubmit: (data: OrderFormInput) => void;
  initialData?: IOrder;
  submitLabel?: string;
  upcomingDays: DaySlot[];
}

const DELIVERY_FEE = 60;

const getDefaultValues = (initialData: IOrder | undefined): OrderFormInput => ({
  customerName: initialData?.customerName ?? "",
  customerPhone: initialData?.customerPhone ?? "",
  deliveryAddress: initialData?.deliveryAddress ?? "",
  source: initialData?.source ?? ORDER_SOURCE_ENUM.ADMIN_PANEL,
  notes: initialData?.notes ?? "",
  packageName: initialData?.packageName ?? initialData?.items[0]?.packageName ?? "",
  deliveryDate: initialData?.deliveryDate ? formatDateValue(new Date(initialData.deliveryDate)) : "",
  items:
    initialData?.items.map((item) => ({
      packageName: item.packageName,
      variantName: item.variantName,
      quantity: item.quantity,
    })) ?? [],
});

const lineItemKey = (packageName: string, variantName: string) => `${packageName}::${variantName}`;

export const OrderForm = ({ onSubmit, initialData, submitLabel = "Create Order", upcomingDays }: OrderFormProps) => {
  const i18n = useOrdersI18n();
  const packageOptions = useMemo(() => adminPackageCatalog.map((pkg) => pkg.name), []);

  const deliveryDateCards = useMemo(
    () =>
      upcomingDays.map((day) => ({
        value: formatDateValue(day.date),
        day: day.day,
        dayLabel: day.tabLabel,
        dateLabel: day.dateLabel,
        isToday: day.isToday,
      })),
    [upcomingDays],
  );

  const form = useForm<OrderFormInput>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: getDefaultValues(initialData),
  });

  useEffect(() => {
    form.reset(getDefaultValues(initialData));
  }, [form, initialData]);

  const selectedPackageName = useWatch({ control: form.control, name: "packageName" });
  const selectedDeliveryDate = useWatch({ control: form.control, name: "deliveryDate" });
  const selectedItems = useWatch({ control: form.control, name: "items" }) ?? [];

  const activePackageName = selectedPackageName || packageOptions[0] || "";
  const variantOptions = useMemo(() => getVariantsByPackageName(activePackageName), [activePackageName]);
  const pricePerMeal = useMemo(() => getPackageByName(activePackageName)?.pricePerMeal ?? 0, [activePackageName]);
  const activeDeliveryDate = selectedDeliveryDate || deliveryDateCards[0]?.value || "";
  const activeDeliveryTab = deliveryDateCards.find((day) => day.value === activeDeliveryDate) ?? null;
  const activeDeliveryLabel = activeDeliveryTab
    ? `${activeDeliveryTab.dayLabel} · ${activeDeliveryTab.dateLabel}`
    : activeDeliveryDate;

  const selectedItemMap = useMemo(() => {
    return new Map(selectedItems.map((item) => [lineItemKey(item.packageName, item.variantName), item.quantity]));
  }, [selectedItems]);

  const activeDateSubtotal = useMemo(
    () =>
      selectedItems
        .filter((item) => item.packageName === activePackageName)
        .reduce((count, item) => count + item.quantity * pricePerMeal, 0),
    [activePackageName, pricePerMeal, selectedItems],
  );

  const selectedVariants = useMemo(
    () =>
      selectedItems
        .map((item) => ({
          ...item,
          subtotal: item.quantity * getPriceByPackageName(item.packageName),
        }))
        .sort((left, right) => left.packageName.localeCompare(right.packageName) || left.variantName.localeCompare(right.variantName)),
    [selectedItems],
  );

  const selectedSubtotal = useMemo(
    () => selectedItems.reduce((count, item) => count + item.quantity * getPriceByPackageName(item.packageName), 0),
    [selectedItems],
  );
  const totalPrice = selectedSubtotal + DELIVERY_FEE;

  const updatePackageName = (packageName: string) => {
    if (form.getValues("packageName") === packageName) return;

    form.setValue("packageName", packageName, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const updateDeliveryDate = (deliveryDate: string) => {
    form.setValue("deliveryDate", deliveryDate, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const updateVariantQuantity = (variantName: string, nextQuantity: number) => {
    const safeQuantity = Math.max(0, Math.min(500, nextQuantity));
    const currentItems = form.getValues("items");
    const key = lineItemKey(activePackageName, variantName);
    const nextItems = currentItems.filter((item) => lineItemKey(item.packageName, item.variantName) !== key);

    if (safeQuantity > 0) {
      nextItems.push({
        packageName: activePackageName,
        variantName,
        quantity: safeQuantity,
      });
    }

    nextItems.sort((left, right) => left.packageName.localeCompare(right.packageName) || left.variantName.localeCompare(right.variantName));

    form.setValue("items", nextItems, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex h-full min-h-0 flex-col overflow-x-hidden pt-0 sm:pt-2"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex-1 overflow-y-auto px-0 pb-3 sm:px-1">
          <div className="grid gap-3 sm:gap-4 xl:grid-cols-12">
            <div className="space-y-4 xl:col-span-12">
              <Card size="sm">
                <CardHeader className="border-b px-4 pb-3">
                  <CardTitle>{i18n.form.customerDetailsTitle}</CardTitle>
                  <CardDescription>{i18n.form.customerDetailsDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-4 pt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{i18n.form.customerNameLabel}</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder={i18n.form.customerNamePlaceholder} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{i18n.form.phoneNumberLabel}</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder={i18n.form.phonePlaceholder} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="deliveryAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{i18n.form.deliveryAddressLabel}</FormLabel>
                        <FormControl>
                          <Textarea rows={3} placeholder={i18n.form.deliveryAddressPlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{i18n.form.noteLabel}</FormLabel>
                        <FormControl>
                          <Textarea rows={2} placeholder={i18n.form.notePlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card size="sm">
                <CardHeader className="border-b px-4 pb-3">
                  <CardTitle>{i18n.form.packageSelectionTitle}</CardTitle>
                  <CardDescription>{i18n.form.packageSelectionDescription}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pt-4">
                  <FormField
                    control={form.control}
                    name="packageName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {packageOptions.map((packageName) => {
                              const item = getPackageByName(packageName) ?? adminPackageCatalog[0];
                              const selected = field.value === packageName;

                              return (
                                <button
                                  key={packageName}
                                  type="button"
                                  onClick={() => updatePackageName(packageName)}
                                  className={cn(
                                    "rounded-lg border p-3 text-left transition-all",
                                    selected
                                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                                      : "border-border/70 hover:border-primary/50",
                                  )}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                      <p className="truncate text-sm font-semibold text-foreground">
                                        {item?.name ?? packageName}
                                      </p>
                                      <p className="mt-0.5 text-xs text-muted-foreground">
                                        {item?.variants.length ?? 0} variants
                                      </p>
                                    </div>
                                    <p className="shrink-0 text-sm font-bold text-primary">
                                      {formatCurrency(item?.pricePerMeal ?? 0)}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card size="sm">
                <CardHeader className="border-b px-4 pb-3">
                  <CardTitle>{i18n.form.deliveryDateSelectionTitle}</CardTitle>
                  <CardDescription>{i18n.form.deliveryDateSelectionDescription}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pt-4">
                  <FormField
                    control={form.control}
                    name="deliveryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-wrap gap-2">
                            {deliveryDateCards.map((day) => (
                              <DayTab
                                key={day.value}
                                day={day.day}
                                dateLabel={day.dateLabel}
                                isToday={day.isToday}
                                active={field.value === day.value}
                                onClick={() => updateDeliveryDate(day.value)}
                              />
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card size="sm">
                <CardHeader className="border-b px-4 pb-3">
                  <CardTitle>{i18n.form.addVariant}</CardTitle>
                  <CardDescription>
                    {interpolate(i18n.form.activeVariantsHint, {
                      date: activeDeliveryLabel || "the selected date",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 px-4 pt-4">
                  <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <div className="overflow-hidden rounded-xl border border-border/70 bg-background">
                            <div className="flex items-center justify-between border-b border-border/60 bg-muted/35 px-4 py-3">
                              <p className="text-sm font-semibold text-foreground">{activeDeliveryLabel}</p>
                              <p className="text-base font-semibold text-foreground">
                                {formatCurrency(activeDateSubtotal)}
                              </p>
                            </div>

                            <div className="divide-y divide-border/50">
                              {variantOptions.map((variantName) => {
                                const quantity = selectedItemMap.get(lineItemKey(activePackageName, variantName)) ?? 0;

                                return (
                                  <div key={variantName} className="px-4 py-3">
                                    <div className="mb-2 min-w-0">
                                      <p className="truncate text-sm font-semibold text-foreground">
                                        {activePackageName} - {variantName}
                                      </p>
                                      <p className="mt-0.5 text-xs text-muted-foreground">
                                        {formatCurrency(pricePerMeal)} {i18n.form.pricePerMeal}
                                      </p>
                                    </div>

                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                      <div className="inline-flex self-start items-center rounded-full border border-border/80 bg-background px-1 py-1 sm:self-auto">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          className="h-7 w-7 rounded-full"
                                          onClick={() => updateVariantQuantity(variantName, quantity - 1)}
                                          disabled={quantity <= 0}
                                        >
                                          <Minus className="h-4 w-4" />
                                        </Button>

                                        <p className="w-7 text-center text-sm font-semibold text-foreground">
                                          {quantity}
                                        </p>

                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          className="h-7 w-7 rounded-full"
                                          onClick={() => updateVariantQuantity(variantName, quantity + 1)}
                                        >
                                          <Plus className="h-4 w-4" />
                                        </Button>
                                      </div>

                                      <p className="text-base font-semibold text-foreground sm:text-right">
                                        {formatCurrency(quantity * pricePerMeal)}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {variantOptions.length === 0 ? (
                    <div className="rounded-lg border border-dashed bg-muted/20 px-4 py-3 text-center text-sm text-muted-foreground">
                      {i18n.form.packageSelectionDescription}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4 xl:col-span-12 xl:sticky xl:top-2 xl:self-start">
              <Card size="sm">
                <CardHeader className="border-b px-4 pb-3">
                  <CardTitle>{i18n.form.activeVariantsTitle}</CardTitle>
                  <CardDescription>{i18n.form.activeVariantsDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 px-4 pt-4">
                  {selectedVariants.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{i18n.table.noOrders}</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedVariants.map((item) => (
                        <div
                          key={lineItemKey(item.packageName, item.variantName)}
                          className="flex flex-col gap-2 rounded-md border border-border/60 bg-background/70 px-3 py-2 sm:flex-row sm:items-start sm:justify-between"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-foreground">
                              {item.packageName} - {item.variantName}
                            </p>
                            <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold text-foreground sm:ml-4 sm:text-right">
                            {formatCurrency(item.subtotal)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card size="sm">
                <CardHeader className="border-b px-4 pb-3">
                  <CardTitle>{i18n.form.orderSummaryTitle}</CardTitle>
                  <CardDescription>{i18n.form.orderSummaryDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 px-4 pt-4">
                  <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                    <p>{i18n.form.subtotal}</p>
                    <p className="font-medium text-foreground">{formatCurrency(selectedSubtotal)}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                    <p>{i18n.form.deliveryFee}</p>
                    <p className="font-medium text-foreground">{formatCurrency(DELIVERY_FEE)}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start justify-between gap-2 border-t bg-muted/20 px-4 py-3 sm:flex-row sm:items-center">
                  <p className="text-sm font-semibold text-foreground">{i18n.form.total}</p>
                  <p className="text-base font-bold text-primary">{formatCurrency(totalPrice)}</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 mt-auto flex justify-stretch border-t bg-background px-0 pt-4 pb-1 sm:justify-end sm:px-1">
          <Button type="submit" className="w-full sm:w-auto sm:min-w-32">
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
