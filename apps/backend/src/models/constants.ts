export const modelNames = {
  USER: "users",
  FILE_MEDIA: "filemedias",
  TENANT: "tenants",
  TOKEN_PAIR: "tokenpairs",
  VERIFICATION_TOKEN: "verificationtokens",
};

export type ModelNames = (typeof modelNames)[keyof typeof modelNames];

export { EMAIL_VERIFICATION_STATUS_ENUMS } from "@catering/types";
export { VERIFICATION_TOKEN_TYPE_ENUMS } from "./constants/verification-token";
