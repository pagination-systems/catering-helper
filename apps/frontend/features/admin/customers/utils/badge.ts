import { ACCOUNT_TYPE_ENUMS } from "@catering/types";

export const getRoleBadgeStyles = (role: ACCOUNT_TYPE_ENUMS): string => {
  switch (role) {
    case ACCOUNT_TYPE_ENUMS.ADMIN:
      return "bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800";
    case ACCOUNT_TYPE_ENUMS.CATERER:
      return "bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800";
    case ACCOUNT_TYPE_ENUMS.CUSTOMER:
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100/80 dark:bg-gray-900 dark:text-gray-300 border-gray-200 dark:border-gray-800";
  }
};
