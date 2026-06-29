import { EXPENSE_CATEGORY_ENUM, type PaginationMeta } from "@catering/types";
import { z } from "zod";

export interface IExpense {
  id: string;
  label: string;
  description?: string;
  date: Date;
  category: EXPENSE_CATEGORY_ENUM;
  amount: number;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiEnvelope {
  message: string;
  statusCode: number;
}

export interface GetExpensesApiResponse extends ApiEnvelope {
  items: IExpense[];
  meta: { pagination: PaginationMeta };
}

export interface GetExpenseApiResponse extends ApiEnvelope {
  item: IExpense;
}

export interface CreateExpenseApiResponse extends ApiEnvelope {
  item: IExpense;
}

export interface UpdateExpenseApiResponse extends ApiEnvelope {
  item: IExpense;
}

export interface DeleteExpenseApiResponse extends ApiEnvelope {
  item: null;
}

export interface ExpensesCache {
  items: IExpense[];
  pagination: PaginationMeta;
}

export interface ExpenseCache {
  item: IExpense;
}

export interface ExpenseMutationResult {
  item: IExpense;
  message: string;
}

export type ExpenseValidationMessages = {
  labelRequired: string;
  dateRequired: string;
  dateFuture: string;
  amountNumber: string;
  amountFinite: string;
  amountGtZero: string;
};

export const expenseFormSchema = (messages: ExpenseValidationMessages) =>
  z.object({
    label: z.string().min(1, messages.labelRequired),
    description: z.string().optional(),
    date: z
      .date()
      .min(1, messages.dateRequired)
      .refine(
        (v) => {
          const d = new Date(v);
          const today = new Date();
          today.setHours(23, 59, 59, 999);
          return d <= today;
        },
        { message: messages.dateFuture },
      ),
    category: z.nativeEnum(EXPENSE_CATEGORY_ENUM),
    amount: z.number({ message: messages.amountNumber }).finite(messages.amountFinite).gt(0, messages.amountGtZero),
  });

export const updateExpenseSchema = (messages: ExpenseValidationMessages) => expenseFormSchema(messages);

export type ExpenseFormInput = z.infer<ReturnType<typeof expenseFormSchema>>;
export type UpdateExpenseInput = z.infer<ReturnType<typeof updateExpenseSchema>>;
