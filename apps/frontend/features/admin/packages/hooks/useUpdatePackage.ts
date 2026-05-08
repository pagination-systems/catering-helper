import { PACKAGE_STATUS_ENUM } from "@catering/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import * as packageApi from "../api/package.api";
import { packageCache } from "../queries/package.cache";
import type { UpdatePackageInput } from "../schemas/package.schema";

export const useUpdatePackage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: packageApi.updatePackage,

    onMutate: async (updatedPackage) => {
      await queryClient.cancelQueries();
      return packageCache.optimisticUpdate(queryClient, updatedPackage);
    },

    onError: (error: any, _vars, context) => {
      packageCache.rollback(queryClient, context?.previous);
      toast.error(error?.message || "Failed to update package");
    },

    onSuccess: ({ package: updated, message }) => {
      packageCache.update(queryClient, updated);
      toast.success(message);
    },
  });

  const updatePackage = (
    { id, payload }: { id: string; payload: Partial<UpdatePackageInput> },
    callback?: () => void,
  ) => {
    mutation.mutate(
      { id, payload },
      {
        onSuccess: () => {
          callback?.();
        },
      },
    );
  };

  const activatedPackage = (id: string, callback?: () => void) => {
    mutation.mutate(
      { id, payload: { status: PACKAGE_STATUS_ENUM.ACTIVE } },
      {
        onSuccess: () => {
          callback?.();
        },
      },
    );
  };

  const inactivePackage = (id: string, callback?: () => void) => {
    mutation.mutate(
      { id, payload: { status: PACKAGE_STATUS_ENUM.INACTIVE } },
      {
        onSuccess: () => {
          callback?.();
        },
      },
    );
  };

  return {
    updatePackage,
    activatedPackage,
    inactivePackage,
    isUpdating: mutation.isPending,
  };
};
