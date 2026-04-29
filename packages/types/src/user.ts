import type { USER_ROLE_ENUM } from "./enums";

export interface IUser {
  id: string;
  name: string;
  phone: string;
  role: USER_ROLE_ENUM;
  createdAt: Date;
  updatedAt: Date;
}
