// lib/useQueryConfig.ts

import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Define the default error type (Axios if using Axios, or generic Error)
type DefaultError = AxiosError<unknown>;

/**
 * Default useQuery config with sensible, production-grade settings.
 * You can override these per-query using the options object.
 */
export const defaultQueryConfig: Partial<
  UseQueryOptions<unknown, DefaultError, unknown, unknown[]>
> = {
  staleTime: 1000 * 60 * 5, // 5 minutes — ideal for most data
  retry: 2, // Retry failed requests twice
  refetchOnWindowFocus: false, // No refetch when tab regains focus
  refetchOnMount: false, // Avoid refetching when remounting
  refetchOnReconnect: true, // Retry on reconnection
};
