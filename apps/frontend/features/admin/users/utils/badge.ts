import type { BadgeProps } from "@/components/ui/badge";
import { UserRole } from "../schemas/user.schema";

export const getRoleBadgeVariant = (role: UserRole): BadgeProps["variant"] => {
  switch (role) {
    case UserRole.Owner:
      return "default";
    case UserRole.Admin:
      return "destructive";
    case UserRole.Manager:
      return "secondary";
    case UserRole.Support:
      return "outline";
    default:
      return "default";
  }
};
