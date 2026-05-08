import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import * as packageApi from "../api/package.api";
import { PACKAGE_KEYS } from "../queries/package.keys";
import type { packageFormInput } from "../schemas/package.schema";

export const useCreatePackage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: packageApi.createPackage,

    onError: (error: any) => {
      toast.error(error?.message || "Failed to create package");
    },

    onSuccess: ({ message }) => {
      toast.success(message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PACKAGE_KEYS.lists() });
    },
  });

  const createPackage = (packageData: packageFormInput, callback?: () => void) => {
    mutation.mutate(packageData, {
      onSuccess: () => {
        callback?.();
      },
    });
  };

  return {
    createPackage,
    isCreating: mutation.isPending,
  };
};
