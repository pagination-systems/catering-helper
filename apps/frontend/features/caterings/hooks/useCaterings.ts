import { useQuery } from "@tanstack/react-query";
import { getCaterings } from "../api/directory.api";

export const useCaterings = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["caterings", "list"],
    queryFn: getCaterings,
  });

  return {
    listings: data ?? [],
    isLoading,
    isError,
  };
};
