import { createQualification, getQualifications } from "@/api/qualifications";
import { CreateQualificationApiResponseType } from "@/types/api.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTypedQuery } from "./use-query";
import { QUERY_KEYS } from "@/constants/query-keys";

const useQualifications = () => {
  const mutateQualification = useMutation({
    mutationFn: createQualification,
    onSuccess: (data: CreateQualificationApiResponseType) => {
      console.log("Qualification created:", data);
    },
    onError: (error: AxiosError) => {
      console.error("Error creating qualification:", error);
    },
  });

  const queryQualifications = useTypedQuery({
    queryKey: QUERY_KEYS.QUALIFICATIONS,
    queryFn: async () => getQualifications(),
  });

  return {
    mutateQualification,
    queryQualifications,
  };
};

export default useQualifications;
