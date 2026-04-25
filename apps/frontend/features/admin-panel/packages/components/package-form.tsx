import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, type SelectOption } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  type CreatePackageValues,
  createPackageSchema,
  type DayName,
  dayOrder,
  PackageStatus,
} from "../schemas/package.schema";

interface PackageFormProps {
  onSubmit: (data: CreatePackageValues) => void;
  initialValues?: CreatePackageValues;
  submitLabel?: string;
}

const dayLabelMap: Record<DayName, string> = {
  Sat: "Saturday",
  Sun: "Sunday",
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
};

const statusOptions: SelectOption<PackageStatus>[] = Object.values(PackageStatus).map((status) => ({
  value: status,
  label: status,
}));

const createEmptyVariant = () => ({
  id: crypto.randomUUID(),
  name: "",
  note: "",
  items: [""],
});

const normalizeDays = (days?: CreatePackageValues["days"]): CreatePackageValues["days"] => {
  return dayOrder.map((day) => {
    const existing = days?.find((item) => item.day === day);
    const variants =
      existing?.variants.length && existing.variants.length > 0
        ? existing.variants.map((variant) => ({
            id: variant.id ?? crypto.randomUUID(),
            name: variant.name,
            note: variant.note,
            items: variant.items.length > 0 ? variant.items : [""],
          }))
        : [createEmptyVariant()];

    return {
      day,
      variants,
    };
  });
};

const getDefaultValues = (initialValues?: CreatePackageValues): CreatePackageValues => ({
  name: initialValues?.name ?? "",
  description: initialValues?.description ?? "",
  pricePerMeal: initialValues?.pricePerMeal ?? 120,
  status: initialValues?.status ?? PackageStatus.Active,
  days: normalizeDays(initialValues?.days),
});

export const PackageForm = ({ onSubmit, initialValues, submitLabel = "Create Package" }: PackageFormProps) => {
  const form = useForm<CreatePackageValues>({
    resolver: zodResolver(createPackageSchema),
    defaultValues: getDefaultValues(initialValues),
  });

  useEffect(() => {
    form.reset(getDefaultValues(initialValues));
  }, [form, initialValues]);

  const dayPlans = form.watch("days");

  const dayCountSummary = useMemo(
    () =>
      dayPlans.map((day) => ({
        day: day.day,
        variants: day.variants.length,
      })),
    [dayPlans],
  );

  const updateDays = (nextDays: CreatePackageValues["days"]) => {
    form.setValue("days", nextDays, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const addVariant = (dayIndex: number) => {
    const nextDays = [...dayPlans];
    const day = nextDays[dayIndex];

    nextDays[dayIndex] = {
      ...day,
      variants: [...day.variants, createEmptyVariant()],
    };

    updateDays(nextDays);
  };

  const removeVariant = (dayIndex: number, variantIndex: number) => {
    const nextDays = [...dayPlans];
    const day = nextDays[dayIndex];

    if (day.variants.length <= 1) return;

    nextDays[dayIndex] = {
      ...day,
      variants: day.variants.filter((_, index) => index !== variantIndex),
    };

    updateDays(nextDays);
  };

  const updateVariantField = (dayIndex: number, variantIndex: number, field: "name" | "note", value: string) => {
    const nextDays = [...dayPlans];
    const variant = nextDays[dayIndex]?.variants[variantIndex];

    if (!variant) return;

    nextDays[dayIndex].variants[variantIndex] = {
      ...variant,
      [field]: value,
    };

    updateDays(nextDays);
  };

  const addFoodItem = (dayIndex: number, variantIndex: number) => {
    const nextDays = [...dayPlans];
    const variant = nextDays[dayIndex]?.variants[variantIndex];

    if (!variant) return;

    nextDays[dayIndex].variants[variantIndex] = {
      ...variant,
      items: [...variant.items, ""],
    };

    updateDays(nextDays);
  };

  const removeFoodItem = (dayIndex: number, variantIndex: number, itemIndex: number) => {
    const nextDays = [...dayPlans];
    const variant = nextDays[dayIndex]?.variants[variantIndex];

    if (!variant || variant.items.length <= 1) return;

    nextDays[dayIndex].variants[variantIndex] = {
      ...variant,
      items: variant.items.filter((_, index) => index !== itemIndex),
    };

    updateDays(nextDays);
  };

  const updateFoodItem = (dayIndex: number, variantIndex: number, itemIndex: number, value: string) => {
    const nextDays = [...dayPlans];
    const variant = nextDays[dayIndex]?.variants[variantIndex];

    if (!variant) return;

    const items = [...variant.items];
    items[itemIndex] = value;

    nextDays[dayIndex].variants[variantIndex] = {
      ...variant,
      items,
    };

    updateDays(nextDays);
  };

  const handleSubmit = (data: CreatePackageValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form className="flex h-full min-h-0 flex-col pt-2" onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        <div className="space-y-4 overflow-y-auto pr-1">
          <Card size="sm">
            <CardHeader>
              <CardTitle>Package Overview</CardTitle>
              <CardDescription>Define the core pricing and positioning of this package.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 mt-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Daily Basic Package" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pricePerMeal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price / Meal (BDT)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        step={1}
                        value={field.value}
                        onChange={(event) => field.onChange(Number(event.target.value))}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        name={field.name}
                        options={statusOptions}
                        value={field.value}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Affordable weekday office meals with familiar favorites."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle>7-Day Menu Plan</CardTitle>
                  <CardDescription>Configure one or more variants per day and edit food items quickly.</CardDescription>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground md:grid-cols-4">
                {dayCountSummary.map((item) => (
                  <div key={item.day} className="rounded border border-border/60 bg-muted/30 px-2 py-1">
                    {item.day}: {item.variants} variant{item.variants > 1 ? "s" : ""}
                  </div>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {dayPlans.map((dayPlan, dayIndex) => (
                <div key={dayPlan.day} className="rounded-md border border-border/70 p-3">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{dayLabelMap[dayPlan.day]}</p>
                      <p className="text-xs text-muted-foreground">{dayPlan.day}</p>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={() => addVariant(dayIndex)}>
                      <PlusIcon className="size-4" />
                      Add Variant
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {dayPlan.variants.map((variant, variantIndex) => {
                      const variantNameError =
                        form.formState.errors.days?.[dayIndex]?.variants?.[variantIndex]?.name?.message;
                      const variantItemsError =
                        form.formState.errors.days?.[dayIndex]?.variants?.[variantIndex]?.items?.message;

                      return (
                        <div
                          key={variant.id ?? `${dayPlan.day}-${variantIndex}`}
                          className={cn(
                            "rounded-md border border-border/60 bg-background p-3",
                            variantNameError || variantItemsError ? "border-destructive/60" : "",
                          )}
                        >
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              Variant {variantIndex + 1}
                            </p>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeVariant(dayIndex, variantIndex)}
                              disabled={dayPlan.variants.length <= 1}
                            >
                              <Trash2Icon className="size-4" />
                              Remove Variant
                            </Button>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-1.5">
                              <Label className="text-xs">Variant Name</Label>
                              <Input
                                value={variant.name}
                                onChange={(event) =>
                                  updateVariantField(dayIndex, variantIndex, "name", event.target.value)
                                }
                                placeholder="Chicken Bhuna Set"
                              />
                              {variantNameError ? <p className="text-xs text-destructive">{variantNameError}</p> : null}
                            </div>

                            <div className="space-y-1.5">
                              <Label className="text-xs">Variant Note</Label>
                              <Input
                                value={variant.note}
                                onChange={(event) =>
                                  updateVariantField(dayIndex, variantIndex, "note", event.target.value)
                                }
                                placeholder="Mild spice, office favorite"
                              />
                            </div>
                          </div>

                          <div className="mt-3 space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <Label className="text-xs">Food Items</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addFoodItem(dayIndex, variantIndex)}
                              >
                                <PlusIcon className="size-4" />
                                Add Item
                              </Button>
                            </div>

                            <div className="space-y-2">
                              {(() => {
                                const occurrences = new Map<string, number>();

                                return variant.items.map((item, itemIndex) => {
                                  const itemCount = (occurrences.get(item) ?? 0) + 1;
                                  occurrences.set(item, itemCount);
                                  const itemKey = `${variant.id ?? dayPlan.day}-${item}-${itemCount}`;

                                  return (
                                    <div key={itemKey} className="flex items-center gap-2">
                                      <Input
                                        value={item}
                                        onChange={(event) =>
                                          updateFoodItem(dayIndex, variantIndex, itemIndex, event.target.value)
                                        }
                                        placeholder="Rice"
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFoodItem(dayIndex, variantIndex, itemIndex)}
                                        disabled={variant.items.length <= 1}
                                        aria-label="Remove food item"
                                      >
                                        <Trash2Icon className="size-4" />
                                      </Button>
                                    </div>
                                  );
                                });
                              })()}
                            </div>
                            {variantItemsError ? <p className="text-xs text-destructive">{variantItemsError}</p> : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {form.formState.errors.days?.message ? (
                <p className="text-xs text-destructive">{form.formState.errors.days.message}</p>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 flex justify-end border-t pt-4">
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </Form>
  );
};
