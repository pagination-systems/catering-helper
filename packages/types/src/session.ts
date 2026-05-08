import type { IUser } from "./user";

export interface ISession {
  accessToken: string;
  tenantId?: string;
  customerId?: string;
  user: IUser;
}
