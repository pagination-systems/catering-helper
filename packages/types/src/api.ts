import { ACCOUNT_TYPE_ENUMS, USER_ROLE_ENUMS } from './tenant';

export interface IOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1 | 'asc' | 'desc'> | string;
}

export type ListQueryParams<T> = Partial<T> & {
  _id?: string | string[];
  [key: string]: any;
};

export interface IListParams<T> {
  query: ListQueryParams<T>;
  options?: IOptions;
  allowedFields?: string[];
}

export interface CateringPackage {
  id: string;
  title: string;
  priceCents: number;
}

export interface ISession {
  // TODO: UPDATE THIS
  userId: string;
  tenantId: string;
  user: {
    _id: string;
    type: ACCOUNT_TYPE_ENUMS;
    role: USER_ROLE_ENUMS;
  };
}
