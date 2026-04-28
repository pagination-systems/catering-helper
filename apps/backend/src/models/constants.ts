export const modelNames = {
  USER: "users",
  FILE_MEDIA: "filemedias",
  TENANT: "tenants",
};

export type ModelNames = (typeof modelNames)[keyof typeof modelNames];
