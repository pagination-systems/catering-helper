import { z } from "zod";

export const updatePersonalInfoSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(150),
  phone: z
    .string()
    .trim()
    .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladesh phone number.")
    .min(10, "Phone number must be at least 10 digits.")
    .max(20, "Phone number is too long."),
});

export type UpdatePersonalInfoValues = z.infer<typeof updatePersonalInfoSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required.")
      .min(6, "Current password must be at least 6 characters."),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters.")
      .max(100, "Password is too long.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number."),
    confirmPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Admin" | "Staff";
  createdAt: Date;
  updatedAt: Date;
}
