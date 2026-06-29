"use client";

import { EXPENSE_CATEGORY_ENUM } from "@catering/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useExpensesI18n } from "../lib/expenses-i18n";
import { type ExpenseFormInput, expenseFormSchema, type IExpense } from "../schemas/expense.schema";

const categories = Object.values(EXPENSE_CATEGORY_ENUM) as EXPENSE_CATEGORY_ENUM[];

const toFormValues = (expense: IExpense): ExpenseFormInput => ({
  label: expense.label,
  description: expense.description ?? "",
  date: new Date(expense.date),
  category: expense.category,
  amount: expense.amount,
});

interface ExpenseFormProps {
  onSubmit: (values: ExpenseFormInput) => void;
  initialValues?: IExpense;
  submitLabel?: string;
}

export const ExpenseForm = ({ onSubmit, initialValues, submitLabel }: ExpenseFormProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const i18n = useExpensesI18n();
  const resolvedSubmitLabel = submitLabel ?? i18n.form.submitCreate;

  const form = useForm<ExpenseFormInput>({
    resolver: zodResolver(expenseFormSchema(i18n.form.validation)),
    defaultValues: initialValues
      ? toFormValues(initialValues)
      : {
          label: "",
          description: "",
          date: new Date(),
          category: EXPENSE_CATEGORY_ENUM.OTHER,
          amount: 0,
        },
  });

  useEffect(() => {
    if (initialValues) form.reset(toFormValues(initialValues));
  }, [initialValues, form]);

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
              <div className="space-y-4">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{i18n.form.label}</FormLabel>
                        <FormControl>
                          <Input placeholder={i18n.form.labelPlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>{i18n.form.date}</FormLabel>
                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>{i18n.form.datePlaceholder}</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setIsCalendarOpen(false);
                              }}
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{i18n.form.category}</FormLabel>
                        <FormControl>
                          <Select
                            options={categories.map((category) => ({
                              label: i18n.categories[category] ?? category,
                              value: category,
                            }))}
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{i18n.form.amount}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            inputMode="decimal"
                            min={1}
                            step="1"
                            placeholder={i18n.form.amountPlaceholder}
                            {...field}
                            value={Number.isFinite(field.value) ? field.value : ""}
                            onChange={(event) => {
                              const inputValue = event.target.value;
                              field.onChange(inputValue === "" ? Number.NaN : Number(inputValue));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{i18n.form.description}</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder={i18n.form.descriptionPlaceholder} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 mt-auto flex justify-stretch border-t bg-background px-0 pt-4 pb-1 sm:justify-end sm:px-1">
          <Button type="submit" className="w-full sm:w-auto sm:min-w-32">
            {resolvedSubmitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
