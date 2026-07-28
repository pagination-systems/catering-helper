import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required.").max(20, "First name is too long."),
  lastName: z.string().trim().min(1, "Last name is required.").max(20, "Last name is too long."),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z.string().min(8, "New password must be at least 8 characters.").max(50, "Password is too long."),
    confirmPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
