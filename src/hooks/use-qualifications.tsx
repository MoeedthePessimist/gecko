import {
  createQualification,
  getQualifications,
  updateQualification,
} from "@/api/qualifications";
import { CreateQualificationApiResponseType } from "@/types/api.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTypedQuery } from "./use-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useState } from "react";

const useQualifications = () => {
  const [selectedQualificationId, setSelectedQualificationId] =
    useState<string>("");

  const mutateQualification = useMutation({
    mutationFn: createQualification,
    onSuccess: (data: CreateQualificationApiResponseType) => {
      console.log("Qualification created:", data);
    },
    onError: (error: AxiosError) => {
      console.error("Error creating qualification:", error);
    },
  });

  const editQualification = useMutation({
    mutationFn: updateQualification,
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

  const [mutationModalOpen, setMutationModalOpen] = useState<boolean>(false);

  return {
    mutateQualification,
    queryQualifications,
    setSelectedQualificationId,
    selectedQualificationId,
    mutationModalOpen,
    setMutationModalOpen,
    editQualification,
  };
};

export default useQualifications;
