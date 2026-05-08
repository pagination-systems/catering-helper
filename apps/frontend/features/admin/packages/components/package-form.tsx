import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import { type UseFormReturn, useFieldArray, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { usePackagesI18n } from "../lib/packages-i18n";
import {
  type DayName,
  dayOrder,
  type IDayPlan,
  type IPackage,
  type packageFormInput,
  packageFormSchema,
} from "../schemas/package.schema";

interface PackageFormProps {
  onSubmit: (data: packageFormInput) => void;
  initialValues?: IPackage;
  submitLabel?: string;
}

interface DayPlanSectionProps {
  form: UseFormReturn<packageFormInput>;
  dayIndex: number;
  day: DayName;
}

interface VariantCardProps {
  form: UseFormReturn<packageFormInput>;
  dayIndex: number;
  variantIndex: number;
  canRemove: boolean;
  onRemove: () => void;
}

const createEmptyVariant = () => ({
  id: crypto.randomUUID(),
  name: "",
  note: "",
  items: [""],
  available: true,
});

const normalizeDays = (days?: IDayPlan[]): IDayPlan[] => {
  return dayOrder.map((day) => {
    const existing = days?.find((item) => item.day === day);
    if (existing && existing.variants.length > 0) {
      return {
        ...existing,
        variants: existing.variants.map((variant) => ({
          ...variant,
          available: variant.available ?? true,
        })),
      };
    }
    return { day, variants: [createEmptyVariant()] };
  });
};

const getDefaultValues = (initialValues?: IPackage | undefined): packageFormInput => ({
  name: initialValues?.name ?? "",
  description: initialValues?.description ?? "",
  pricePerMeal: initialValues?.pricePerMeal ?? 120,
  days: normalizeDays(initialValues?.days),
});

const VariantCard = ({ form, dayIndex, variantIndex, canRemove, onRemove }: VariantCardProps) => {
  const i18n = usePackagesI18n();
  const variantPrefix = `days.${dayIndex}.variants.${variantIndex}` as const;

  const {
    fields: itemFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: `${variantPrefix}.items` as never,
  });

  useEffect(() => {
    if (itemFields.length === 0) {
      append("");
    }
  }, [append, itemFields.length]);

  const variantErrors = form.formState.errors.days?.[dayIndex]?.variants?.[variantIndex];
  const variantNameError = variantErrors?.name?.message;
  const itemsErrorObj = variantErrors?.items as any;
  const itemsRootError =
    itemsErrorObj?.root?.message || (typeof itemsErrorObj?.message === "string" ? itemsErrorObj.message : undefined);

  return (
    <div
      className={cn(
        "rounded-md border p-3",
        variantNameError || itemsRootError
          ? "border-destructive/60 bg-destructive/5"
          : "border-border/60 bg-background",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {i18n.form.variantPrefix} {variantIndex + 1}
        </p>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          disabled={!canRemove}
          aria-label={i18n.form.removeVariant}
        >
          <Trash2Icon className="size-4" />
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs">{i18n.form.variantNameLabel}</Label>
          <Input {...form.register(`${variantPrefix}.name`)} placeholder={i18n.form.variantNamePlaceholder} />
          {variantNameError ? <p className="text-xs text-destructive">{variantNameError}</p> : null}
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">{i18n.form.variantNoteLabel}</Label>
          <Input {...form.register(`${variantPrefix}.note`)} placeholder={i18n.form.variantNotePlaceholder} />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-sm border border-border/70 bg-muted/20 px-3 py-2">
        <div>
          <p className="text-xs font-medium">{i18n.form.availableLabel}</p>
          <p className="text-[11px] text-muted-foreground">{i18n.form.availableDescription}</p>
        </div>
        <FormField
          control={form.control}
          name={`${variantPrefix}.available`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch checked={field.value ?? true} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs">{i18n.form.foodItemsLabel}</Label>
          <Button type="button" variant="outline" size="sm" onClick={() => append("")}>
            <PlusIcon className="mr-1 size-4" /> {i18n.form.addItem}
          </Button>
        </div>

        <div className="space-y-2">
          {itemFields.map((itemField, itemIndex) => {
            const itemError = variantErrors?.items?.[itemIndex]?.message;
            return (
              <div key={itemField.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Input
                    {...form.register(`${variantPrefix}.items.${itemIndex}`)}
                    placeholder={i18n.form.itemPlaceholder}
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => remove(itemIndex)}>
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>
                {itemError ? <p className="text-xs text-destructive">{String(itemError)}</p> : null}
              </div>
            );
          })}
        </div>
        {itemsRootError ? <p className="text-xs text-destructive">{String(itemsRootError)}</p> : null}
      </div>
    </div>
  );
};

const DayPlanSection = ({ form, dayIndex, day }: DayPlanSectionProps) => {
  const i18n = usePackagesI18n();
  const {
    fields: variants,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: `days.${dayIndex}.variants`,
  });

  return (
    <div className="rounded-md border border-border/70 p-3">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{i18n.dayLabels[day]}</p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => append(createEmptyVariant())}>
          <PlusIcon className="mr-1 size-4" /> {i18n.form.addVariant}
        </Button>
      </div>

      <div className="space-y-3">
        {variants.map((variant, variantIndex) => (
          <VariantCard
            key={variant.id}
            form={form}
            dayIndex={dayIndex}
            variantIndex={variantIndex}
            canRemove={variants.length > 1}
            onRemove={() => remove(variantIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export const PackageForm = ({ onSubmit, initialValues, submitLabel }: PackageFormProps) => {
  const i18n = usePackagesI18n();
  const form = useForm<packageFormInput>({
    resolver: zodResolver(packageFormSchema(i18n.form.validation)),
    defaultValues: getDefaultValues(initialValues),
  });

  useEffect(() => {
    form.reset(getDefaultValues(initialValues));
  }, [form, initialValues]);

  const { fields: dayFields } = useFieldArray({
    control: form.control,
    name: "days",
  });

  const dayPlans = useWatch({ control: form.control, name: "days" }) || [];
  const resolvedSubmitLabel = submitLabel ?? i18n.form.submitCreate;

  return (
    <Form {...form}>
      <form className="flex h-full min-h-0 flex-col pt-2" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4 overflow-y-auto pr-1">
          <Card size="sm">
            <CardHeader>
              <CardTitle>{i18n.form.overviewTitle}</CardTitle>
              <CardDescription>{i18n.form.overviewDescription}</CardDescription>
            </CardHeader>
            <CardContent className="mt-2 grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{i18n.form.packageNameLabel}</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder={i18n.form.packageNamePlaceholder} {...field} />
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
                    <FormLabel>{i18n.form.priceLabel}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        step={1}
                        value={field.value}
                        onChange={(event) => field.onChange(Number(event.target.value))}
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
                    <FormLabel>{i18n.form.descriptionLabel}</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder={i18n.form.descriptionPlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader className="space-y-3">
              <div>
                <CardTitle>{i18n.form.menuPlanTitle}</CardTitle>
                <CardDescription>{i18n.form.menuPlanDescription}</CardDescription>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground md:grid-cols-4">
                {dayPlans.map((item) => (
                  <div key={item.day} className="rounded border border-border/60 bg-muted/30 px-2 py-1">
                    {i18n.dayLabels[item.day]}: {item.variants?.length || 0}{" "}
                    {(item.variants?.length || 0) === 1 ? i18n.form.variantLabel : i18n.form.variantsLabel}
                  </div>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {dayFields.map((day, dayIndex) => (
                <DayPlanSection key={day.id} form={form} dayIndex={dayIndex} day={day.day} />
              ))}
              {form.formState.errors.days?.message && (
                <p className="text-xs text-destructive">{form.formState.errors.days.message}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 flex justify-end border-t pt-4">
          <Button type="submit">{resolvedSubmitLabel}</Button>
        </div>
      </form>
    </Form>
  );
};
