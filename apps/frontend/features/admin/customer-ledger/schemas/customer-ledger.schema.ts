import type { PaginationMeta } from "@catering/types";
import { z } from "zod";

export interface ICustomerLedger {
  id: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  totalPaidAmount: number;
  dueAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetCustomerLedgerResponse {
  data: ICustomerLedger[];
  meta: {
    pagination: PaginationMeta;
  };
}

type LedgerPaymentValidationMessages = {
  paidAmountNumber: string;
  paidAmountFinite: string;
  paidAmountPositive: string;
};

const defaultValidationMessages: LedgerPaymentValidationMessages = {
  paidAmountNumber: "Pay amount must be a number.",
  paidAmountFinite: "Pay amount must be a valid number.",
  paidAmountPositive: "Pay amount must be greater than 0.",
};

export const createUpdateLedgerPaymentSchema = (messages?: Partial<LedgerPaymentValidationMessages>) => {
  const nextMessages = { ...defaultValidationMessages, ...messages };

  return z.object({
    paidAmount: z
      .number({
        message: nextMessages.paidAmountNumber,
      })
      .finite(nextMessages.paidAmountFinite)
      .gt(0, nextMessages.paidAmountPositive),
  });
};

export const updateLedgerPaymentSchema = createUpdateLedgerPaymentSchema();

export type UpdateLedgerPaymentValues = z.infer<typeof updateLedgerPaymentSchema>;
