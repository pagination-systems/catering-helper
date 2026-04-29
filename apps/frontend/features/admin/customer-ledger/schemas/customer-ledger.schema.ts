import { z } from "zod";

export interface PaginationMeta {
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page?: number | undefined;
  totalPages: number;
  prevPage?: number | null | undefined;
  nextPage?: number | null | undefined;
  pagingCounter: number;
}

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
