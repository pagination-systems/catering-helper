import type { IUser } from "@catering/types";
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

export interface GetUsersResponse {
  data: IUser[];
  meta: {
    pagination: PaginationMeta;
  };
}

export const createCustomerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  phone: z.string().trim().min(10, "Phone number must be at least 10 characters."),
});

export type CreateCustomerValues = z.infer<typeof createCustomerSchema>;
