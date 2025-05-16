import { me } from "@/api/user";
import { defaultQueryConfig } from "@/configs/default-query-config";
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
    queryKey: ["me"],
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
