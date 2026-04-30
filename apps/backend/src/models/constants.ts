export const modelNames = {
  USER: "users",
  FILE_MEDIA: "filemedias",
  TENANT: "tenants",
  TOKEN_PAIR: "tokenpairs",
};

export type ModelNames = (typeof modelNames)[keyof typeof modelNames];
