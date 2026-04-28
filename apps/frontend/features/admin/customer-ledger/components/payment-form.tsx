"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDollarSign, Phone, UserRound } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { type UpdateLedgerPaymentValues, updateLedgerPaymentSchema } from "../schemas/customer-ledger.schema";

interface PaymentFormProps {
  onSubmit: (values: UpdateLedgerPaymentValues) => void;
  maxDueAmount: number;
  customerName: string;
  customerPhone: string;
  submitLabel?: string;
}

export const PaymentForm = ({
  onSubmit,
  maxDueAmount,
  customerName,
  customerPhone,
  submitLabel = "Save Payment",
}: PaymentFormProps) => {
  const validationSchema = useMemo(
    () =>
      updateLedgerPaymentSchema.superRefine((values, ctx) => {
        if (values.paidAmount > maxDueAmount) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["paidAmount"],
            message: `Amount cannot exceed due amount (${formatCurrency(maxDueAmount)}).`,
          });
        }
      }),
    [maxDueAmount],
  );

  const form = useForm<UpdateLedgerPaymentValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      paidAmount: 0,
    },
  });

  const paidAmount = form.watch("paidAmount");
  const normalizedPaidAmount = Number.isFinite(paidAmount) ? Math.max(0, paidAmount) : 0;
  const remainingDue = Math.max(0, maxDueAmount - normalizedPaidAmount);
  const quickAmounts = useMemo(() => {
    if (maxDueAmount <= 0) return [];

    const candidates = [Math.ceil(maxDueAmount * 0.25), Math.ceil(maxDueAmount * 0.5), maxDueAmount];

    return Array.from(new Set(candidates.filter((amount) => amount > 0 && amount <= maxDueAmount)));
  }, [maxDueAmount]);

  return (
    <Form {...form}>
      <form className="flex h-full flex-col gap-5 pt-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4 rounded-xl border border-border/80 bg-muted/20 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border bg-background p-3">
              <p className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <UserRound className="h-3.5 w-3.5" />
                Customer Name
              </p>
              <p className="text-sm font-semibold text-foreground">{customerName}</p>
            </div>

            <div className="rounded-md border bg-background p-3">
              <p className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                Phone Number
              </p>
              <p className="text-sm font-semibold text-foreground">{customerPhone}</p>
            </div>
          </div>

          <div className="rounded-md border border-dashed border-border bg-background p-3">
            <p className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <CircleDollarSign className="h-3.5 w-3.5" />
              Current Due Amount
            </p>
            <p className="text-xl font-semibold text-destructive">{formatCurrency(maxDueAmount)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Remaining after this payment: {formatCurrency(remainingDue)}
            </p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="paidAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pay Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="decimal"
                  min={1}
                  max={maxDueAmount}
                  step="1"
                  placeholder="Enter paid amount"
                  {...field}
                  value={Number.isFinite(field.value) ? field.value : ""}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    field.onChange(inputValue === "" ? Number.NaN : Number(inputValue));
                  }}
                />
              </FormControl>
              {quickAmounts.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        form.setValue("paidAmount", amount, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }}
                    >
                      {formatCurrency(amount)}
                    </Button>
                  ))}
                </div>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-auto flex justify-end border-t border-border/80 pt-4">
          <Button type="submit" disabled={maxDueAmount <= 0}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
