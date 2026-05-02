import type { IUser } from "./user";

export interface ISession {
<<<<<<< HEAD
  accessToken: string;
  tenantId: string;
  customerId?: string;
  user: IUser;
=======
  user: IUser;
  tenantId?: string;
>>>>>>> e97f6df131394773e884aba048eaafe3cae0b690
}
