export interface CateringPackage {
  id: string;
  title: string;
  priceCents: number;
}

export interface ISession {
  // TODO: UPDATE THIS
  userId: string;
}

export * from "./tenant";
export * from "./user";
