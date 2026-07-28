import type { PaginationMeta } from "@catering/types";
import { apiClient } from "@/lib/axios";
import type {
  IDayPlan,
  IMenuVariant,
  IPackage,
  PackageCache,
  PackageMutationResult,
  PackagesCache,
  packageFormInput,
  UpdatePackageInput,
} from "../schemas/package.schema";

/** Package payload as returned by the backend (Mongo `_id`, dates as ISO strings). */
type RawVariant = Partial<IMenuVariant> & { _id?: string };
type RawDay = { day: IDayPlan["day"]; variants?: RawVariant[] };
type RawPackage = {
  _id?: string;
  id?: string;
  name?: string;
  description?: string;
  pricePerMeal?: number;
  status: IPackage["status"];
  days?: RawDay[];
  tenantId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

interface ApiEnvelope {
  message: string;
  statusCode: number;
}

interface GetPackagesApiResponse extends ApiEnvelope {
  packages: RawPackage[];
  pagination: PaginationMeta;
}

interface PackageApiResponse extends ApiEnvelope {
  package: RawPackage | null;
}

export type CreatePackageInput = packageFormInput & { tenantId: string };

const toVariant = (raw: RawVariant): IMenuVariant => ({
  id: raw.id ?? raw._id ?? crypto.randomUUID(),
  name: raw.name ?? "",
  note: raw.note ?? "",
  items: raw.items ?? [],
  available: raw.available ?? true,
});

const toDay = (raw: RawDay): IDayPlan => ({
  day: raw.day,
  variants: (raw.variants ?? []).map(toVariant),
});

const toPackage = (raw: RawPackage): IPackage => ({
  id: raw._id ?? raw.id ?? "",
  name: raw.name ?? "",
  description: raw.description ?? "",
  pricePerMeal: raw.pricePerMeal ?? 0,
  status: raw.status,
  days: (raw.days ?? []).map(toDay),
  tenantId: raw.tenantId ?? "",
  createdAt: raw.createdAt ? new Date(raw.createdAt) : new Date(),
  updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : new Date(),
});

export const getPackages = async (query?: string): Promise<PackagesCache> => {
  const { data } = await apiClient.get<GetPackagesApiResponse>(query ? `/packages?${query}` : "/packages");
  return {
    packages: (data.packages ?? []).map(toPackage),
    pagination: data.pagination,
  };
};

export const getPackage = async (id: string): Promise<PackageCache> => {
  const { data } = await apiClient.get<PackageApiResponse>(`/packages/${id}`);
  return { package: toPackage(data.package as RawPackage) };
};

export const createPackage = async (payload: CreatePackageInput): Promise<PackageMutationResult> => {
  const { data } = await apiClient.post<PackageApiResponse>("/packages", payload);
  return { package: toPackage(data.package as RawPackage), message: data.message };
};

export const updatePackage = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<UpdatePackageInput>;
}): Promise<PackageMutationResult> => {
  const { data } = await apiClient.put<PackageApiResponse>("/packages", { id, ...payload });
  return { package: toPackage(data.package as RawPackage), message: data.message };
};

export const hardDeletePackage = async (id: string): Promise<{ message: string }> => {
  const { data } = await apiClient.delete<PackageApiResponse>(`/packages/${id}`);
  return { message: data.message };
};
