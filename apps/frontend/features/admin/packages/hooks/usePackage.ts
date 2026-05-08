import { useQuery } from "@tanstack/react-query";
import * as packageApi from "../api/package.api";
import { PACKAGE_KEYS } from "../queries/package.keys";

export const usePackage = (id?: string) => {
  const { data, isLoading, ...query } = useQuery({
    queryKey: PACKAGE_KEYS.detail(id as string),
    queryFn: () => packageApi.getPackage(id as string),
    enabled: !!id,
  });

  return {
    package: data?.package,
    isGettingPackage: isLoading,
    ...query,
  };
};
