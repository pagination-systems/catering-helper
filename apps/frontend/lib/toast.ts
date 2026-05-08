import { toast as sonner } from "sonner";

export const toast = {
  success: (message: string) => sonner.success(message),
  error: (message: string) => sonner.error(message),
  loading: (message: string) => sonner.loading(message),
  dismiss: (id?: string) => sonner.dismiss(id),
};
