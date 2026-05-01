import { z } from "zod";

export enum UserRole {
  Owner = "Owner",
  Admin = "Admin",
  Manager = "Manager",
  Support = "Support",
}

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

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetUsersResponse {
  data: IUser[];
  meta: {
    pagination: PaginationMeta;
  };
}

export const createUserSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  role: z.enum(UserRole),
});

export type CreateUserValues = z.infer<typeof createUserSchema>;
