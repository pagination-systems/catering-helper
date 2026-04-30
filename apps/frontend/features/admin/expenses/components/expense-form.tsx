"use client";

import { EXPENSE_CATEGORY_ENUM } from "@catering/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatDateValue } from "@/lib/utils";
import { type CreateExpenseValues, createExpenseSchema } from "../schemas/expense.schema";

const categories = Object.values(EXPENSE_CATEGORY_ENUM) as EXPENSE_CATEGORY_ENUM[];

interface ExpenseFormProps {
  onSubmit: (values: CreateExpenseValues) => void;
  initialValues?: CreateExpenseValues;
  submitLabel?: string;
}

type ExpenseFormInputValues = z.input<typeof createExpenseSchema>;

export const ExpenseForm = ({ onSubmit, initialValues, submitLabel = "Add Expense" }: ExpenseFormProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const form = useForm<ExpenseFormInputValues, unknown, CreateExpenseValues>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: initialValues ?? {
      label: "",
      description: "",
      date: formatDateValue(new Date()),
      category: EXPENSE_CATEGORY_ENUM.OTHER,
      amount: 0,
    },
  });

  useEffect(() => {
    if (initialValues) form.reset(initialValues);
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
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input placeholder="Expense label" {...field} />
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
                        <FormLabel>Date</FormLabel>
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
                                {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={(date) => {
                                field.onChange(date ? format(date, "yyyy-MM-dd") : "");
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
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select
                            options={categories.map((category) => ({ label: category, value: category }))}
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
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            inputMode="decimal"
                            min={1}
                            step="1"
                            placeholder="Enter amount"
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="Optional description" {...field} />
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
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
