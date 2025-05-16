import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useTypedQuery<TData>(
  options: UseQueryOptions<TData, AxiosError, TData>
): UseQueryResult<TData, AxiosError> {
  return useQuery<TData, AxiosError, TData>({
    staleTime: 1000 * 60 * 5, // 5 minutes — ideal for most data
    retry: 2, // Retry failed requests twice
    refetchOnWindowFocus: false, // No refetch when tab regains focus
    refetchOnMount: false, // Avoid refetching when remounting
    refetchOnReconnect: true, // Retry on reconnection
    ...options,
  });
}
