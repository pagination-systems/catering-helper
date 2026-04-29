import { EXPENSE_CATEGORY_ENUM } from "../schemas/expense.schema";

export const getCategoryBadgeStyles = (category: EXPENSE_CATEGORY_ENUM): string => {
  switch (category) {
    case EXPENSE_CATEGORY_ENUM.FOOD_AND_RAW_MATERIALS:
      return "bg-orange-100 text-orange-800 hover:bg-orange-100/80 dark:bg-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-800";

    case EXPENSE_CATEGORY_ENUM.LABOR:
      return "bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800";

    case EXPENSE_CATEGORY_ENUM.TRANSPORT:
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800";

    case EXPENSE_CATEGORY_ENUM.RENT:
      return "bg-purple-100 text-purple-800 hover:bg-purple-100/80 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800";

    case EXPENSE_CATEGORY_ENUM.UTILITIES:
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";

    case EXPENSE_CATEGORY_ENUM.MARKETING_AND_SALES:
      return "bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800";

    case EXPENSE_CATEGORY_ENUM.SOFTWARE:
      return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100/80 dark:bg-indigo-900 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800";

    case EXPENSE_CATEGORY_ENUM.OTHER:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100/80 dark:bg-gray-900 dark:text-gray-300 border-gray-200 dark:border-gray-800";

    default:
      return "bg-slate-100 text-slate-800 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-300";
  }
};
