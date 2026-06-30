import { useMutation } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import * as onboardingApi from "../api/onboarding.api";
import type { OnboardCatererValues } from "../schemas/onboarding.schema";

export const useOnboardCaterer = () => {
  const mutation = useMutation({
    mutationFn: onboardingApi.onboardCaterer,

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to onboard caterer");
    },

    onSuccess: ({ message }) => {
      toast.success(message || "Caterer onboarded successfully");
    },
  });

  const onboardCaterer = (values: OnboardCatererValues, callback?: () => void) => {
    mutation.mutate(values, {
      onSuccess: () => {
        callback?.();
      },
    });
  };

  return {
    onboardCaterer,
    isSubmitting: mutation.isPending,
  };
};
