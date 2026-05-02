export enum ACCOUNT_TYPE_ENUMS {
  ADMIN = "admin",
  CATERER = "caterer",
  CUSTOMER = "customer",
  // Add more account types as needed
}

export enum KYC_STATUS_ENUMS {
  PENDING = "pending",
  VERIFIED = "verified",
  REJECTED = "rejected",
}

export enum USER_ROLE_ENUMS {
  TENANT_ADMIN = "tenant_admin",
  DELIVERY_PERSONNEL = "delivery_personnel",
}

export enum EMAIL_VERIFICATION_STATUS_ENUMS {
  UNVERIFIED = "unverified",
  VERIFIED = "verified",
}

export interface IUser {
  _id: string;
  id: string;
  name: string;
  phone: string;
  tenantId: string;
  email: string;
  type: ACCOUNT_TYPE_ENUMS;
  role?: USER_ROLE_ENUMS;
  emailVerificationStatus: EMAIL_VERIFICATION_STATUS_ENUMS;
  createdAt: Date;
  updatedAt: Date;
}
