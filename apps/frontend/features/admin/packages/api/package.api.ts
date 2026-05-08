import { apiClient } from "@/lib/axios";
import type {
  CreatePackageApiResponse,
  DeletePackageApiResponse,
  GetPackageApiResponse,
  GetPackagesApiResponse,
  PackageCache,
  PackageMutationResult,
  PackagesCache,
  packageFormInput,
  UpdatePackageApiResponse,
  UpdatePackageInput,
} from "../schemas/package.schema";

export const getPackages = async (query?: string): Promise<PackagesCache> => {
  const { data } = await apiClient.get<GetPackagesApiResponse>(query ? `/packages?${query}` : "/packages");
  return {
    packages: data.packages,
    pagination: data.meta.pagination,
  };
};

export const getPackage = async (id: string): Promise<PackageCache> => {
  const { data } = await apiClient.get<GetPackageApiResponse>(`/packages/${id}`);
  return { package: data.package };
};

export const createPackage = async (payload: packageFormInput): Promise<PackageMutationResult> => {
  const { data } = await apiClient.post<CreatePackageApiResponse>("/packages", payload);
  return { package: data.package, message: data.message };
};

export const updatePackage = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<UpdatePackageInput>;
}): Promise<PackageMutationResult> => {
  const { data } = await apiClient.put<UpdatePackageApiResponse>("/packages", { id, ...payload });
  return { package: data.package, message: data.message };
};

export const softDeletePackage = async (id: string): Promise<{ message: string }> => {
  const { data } = await apiClient.delete<DeletePackageApiResponse>(`/packages/${id}`);
  return { message: data.message };
};

export const hardDeletePackage = async (id: string): Promise<{ message: string }> => {
  const { data } = await apiClient.delete<DeletePackageApiResponse>(`/packages/${id}`);
  return { message: data.message };
};
