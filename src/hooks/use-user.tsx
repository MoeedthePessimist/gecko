import { me } from "@/api/user";
import { defaultQueryConfig } from "@/configs/default-query-config";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const {
    data,
    isError,
    isSuccess,
    isStale,
    isFetched,
    isFetching,
    refetch,
    isRefetching,
  } = useQuery({
    ...defaultQueryConfig,
    queryKey: QUERY_KEYS.ME,
    queryFn: me,
  });

  return {
    data,
    isError,
    isSuccess,
    isStale,
    isFetched,
    isFetching,
    refetch,
    isRefetching,
  };
};

export default useUser;
