import { useQuery } from "@tanstack/react-query";
import * as expenseApi from "../api/expense.api";
import { EXPENSE_KEYS } from "../queries/expense.keys";

export const useExpense = (id?: string) => {
  const { data, isLoading, ...query } = useQuery({
    queryKey: EXPENSE_KEYS.detail(id as string),
    queryFn: () => expenseApi.getExpense(id as string),
    enabled: !!id,
  });

  return { expense: data?.item, isGettingExpense: isLoading, ...query };
};
