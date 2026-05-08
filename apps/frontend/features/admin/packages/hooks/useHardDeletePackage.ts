import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import * as packageApi from "../api/package.api";
import { packageCache } from "../queries/package.cache";

export const useHardDeletePackage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => packageApi.hardDeletePackage(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries();
      return packageCache.optimisticHardDelete(queryClient, id);
    },

    onError: (error: any, _id, context) => {
      packageCache.rollback(queryClient, context?.previous);
      toast.error(error?.message || "Failed to delete package");
    },

    onSuccess: ({ message }) => {
      toast.success(message);
    },
  });

  const deletePackage = (id: string, callback?: () => void) => {
    mutation.mutate(id, {
      onSuccess: () => {
        callback?.();
      },
    });
  };

  return {
    deletePackage,
    isDeleting: mutation.isPending,
  };
};
