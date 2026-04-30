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

export const updateLedgerPaymentSchema = z.object({
  paidAmount: z
    .number({
      message: "Pay amount must be a number.",
    })
    .finite("Pay amount must be a valid number.")
    .gt(0, "Pay amount must be greater than 0."),
});

export type UpdateLedgerPaymentValues = z.infer<typeof updateLedgerPaymentSchema>;
