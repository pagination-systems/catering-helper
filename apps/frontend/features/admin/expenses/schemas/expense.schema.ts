import { EXPENSE_CATEGORY_ENUM } from "@catering/types";
import { z } from "zod";

export const createExpenseSchema = z.object({
  label: z.string().min(1, "Label is required"),
  description: z.string().optional(),
  date: z
    .string()
    .min(1, "Date is required")
    .refine(
      (v) => {
        const d = new Date(v);
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return d <= today;
      },
      { message: "Date cannot be in the future" },
    ),
  category: z.enum(EXPENSE_CATEGORY_ENUM).default(EXPENSE_CATEGORY_ENUM.OTHER),
  amount: z
    .number({
      message: "Amount must be a number.",
    })
    .finite("Amount must be a valid number.")
    .gt(0, "Amount must be greater than 0."),
});

export type CreateExpenseValues = z.infer<typeof createExpenseSchema>;

export type IExpense = {
  id: string;
  label: string;
  description?: string;
  date: Date;
  category: EXPENSE_CATEGORY_ENUM;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};
