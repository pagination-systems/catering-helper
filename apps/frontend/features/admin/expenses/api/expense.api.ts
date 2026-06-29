import { apiClient } from "@/lib/axios";
import type {
  CreateExpenseApiResponse,
  DeleteExpenseApiResponse,
  ExpenseCache,
  ExpenseFormInput,
  ExpenseMutationResult,
  ExpensesCache,
  GetExpenseApiResponse,
  GetExpensesApiResponse,
  UpdateExpenseApiResponse,
  UpdateExpenseInput,
} from "../schemas/expense.schema";

export const getExpenses = async (query?: string): Promise<ExpensesCache> => {
  const { data } = await apiClient.get<GetExpensesApiResponse>(
    query ? `/expenses?${query}` : "/expenses",
  );
  return { items: data.items, pagination: data.meta.pagination };
};

export const getExpense = async (id: string): Promise<ExpenseCache> => {
  const { data } = await apiClient.get<GetExpenseApiResponse>(`/expenses/${id}`);
  return { item: data.item };
};

export const createExpense = async (payload: ExpenseFormInput): Promise<ExpenseMutationResult> => {
  const { data } = await apiClient.post<CreateExpenseApiResponse>("/expenses", payload);
  return { item: data.item, message: data.message };
};

export const updateExpense = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<UpdateExpenseInput>;
}): Promise<ExpenseMutationResult> => {
  const { data } = await apiClient.put<UpdateExpenseApiResponse>("/expenses", { id, ...payload });
  return { item: data.item, message: data.message };
};

export const hardDeleteExpense = async (id: string): Promise<{ message: string }> => {
  const { data } = await apiClient.delete<DeleteExpenseApiResponse>(`/expenses/${id}`);
  return { message: data.message };
};
