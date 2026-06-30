import { apiClient } from "@/lib/axios";
import type { OnboardCatererResponse, OnboardCatererValues } from "../schemas/onboarding.schema";

export const onboardCaterer = async (payload: OnboardCatererValues): Promise<OnboardCatererResponse> => {
  const { data } = await apiClient.post<OnboardCatererResponse>("/tenants", payload);
  return data;
};
