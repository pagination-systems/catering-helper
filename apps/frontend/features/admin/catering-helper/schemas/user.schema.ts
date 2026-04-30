import type { IUser, PaginationMeta } from "@catering/types";
import { z } from "zod";

export interface GetUsersResponse {
  data: IUser[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface SentInvitation {
  id: string;
  phone: string;
  lastSentAt: Date;
}

export interface GetSentInvitationsResponse {
  data: SentInvitation[];
  meta: {
    pagination: PaginationMeta;
  };
}

export const invitePlatformAdminSchema = z.object({
  phone: z.string().trim().min(10, "Phone number must be at least 10 characters."),
});

export type InvitePlatformAdminValues = z.infer<typeof invitePlatformAdminSchema>;
