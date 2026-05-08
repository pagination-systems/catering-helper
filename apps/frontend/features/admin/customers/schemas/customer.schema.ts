import type { IUser, PaginationMeta } from "@catering/types";
import { z } from "zod";

export interface GetUsersResponse {
  data: IUser[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface CreateCustomerSchemaMessages {
  nameMin: string;
  phoneMin: string;
}

export const createCustomerSchema = (messages: CreateCustomerSchemaMessages) =>
  z.object({
    name: z.string().trim().min(2, messages.nameMin),
    phone: z.string().trim().min(10, messages.phoneMin),
  });

export type CreateCustomerValues = z.infer<ReturnType<typeof createCustomerSchema>>;
