export const preparePayload = <T extends Record<string, unknown>>(data: T): Partial<T> => {
  return Object.entries(data).reduce(
    (acc, [key, value]) => {
      const cleanedValue = typeof value === "string" ? value.trim() : value;

      if (cleanedValue !== "" && cleanedValue !== undefined && cleanedValue !== null) {
        acc[key as keyof T] = cleanedValue as T[keyof T];
      }

      return acc;
    },
    {} as Partial<T>,
  );
};
