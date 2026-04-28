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

const bdPhoneRegex = /^01[3-9]\d{8}$/;

export const customerLedgerSchema = z.object({
  customerName: z.string().trim().min(2, "Customer name must be at least 2 characters.").max(80),
  customerPhone: z
    .string()
    .trim()
    .regex(bdPhoneRegex, "Enter a valid Bangladesh phone number.")
    .min(10, "Phone number must be at least 10 digits.")
    .max(20, "Phone number is too long."),
  totalAmount: z.number().nonnegative(),
  totalPaidAmount: z.number().nonnegative(),
  dueAmount: z.number().nonnegative(),
});

export const updateLedgerPaymentSchema = z.object({
  paidAmount: z
    .number({
      message: "Pay amount must be a number.",
    })
    .finite("Pay amount must be a valid number.")
    .gt(0, "Pay amount must be greater than 0."),
});

export type UpdateLedgerPaymentValues = z.infer<typeof updateLedgerPaymentSchema>;
