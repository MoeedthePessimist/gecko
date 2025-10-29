import {
  createQualification,
  deleteQualification,
  getQualifications,
  updateQualification,
} from "@/api/qualifications";
import { CreateQualificationApiResponseType } from "@/types/api.type";
import { useMutation } from "@tanstack/react-query";
import { useTypedQuery } from "./use-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useState } from "react";
import { useGlobalModal } from "@/context/error-context";
import { AxiosErrorWithMessage } from "@/types/common.type";

const useQualifications = () => {
  const [selectedQualificationId, setSelectedQualificationId] =
    useState<string>("");

  const { showError, showSuccess } = useGlobalModal();

  const mutateQualification = useMutation({
    mutationFn: createQualification,
    onSuccess: (data: CreateQualificationApiResponseType) => {
      console.log("Qualification created:", data);
      showSuccess("Qualification created successfully!");
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error("Error creating qualification:", error);
      showError(
        error.response?.data.message ||
          "Failed to create qualification. Please try again."
      );
    },
  });

  const editQualification = useMutation({
    mutationFn: updateQualification,
    onSuccess: (data: CreateQualificationApiResponseType) => {
      console.log("Qualification created:", data);
      showSuccess("Qualification updated successfully!");
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error("Error creating qualification:", error);
      showError(
        error.response?.data.message ||
          "Failed to update qualification. Please try again."
      );
    },
  });

  const removeQualification = useMutation({
    mutationFn: deleteQualification,
    onSuccess: (data) => {
      console.log("Qualification deleted:", data);
      showSuccess("Qualification deleted successfully!");
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error("Error deleting qualification:", error);
      showError(
        error.response?.data.message ||
          "Failed to delete qualification. Please try again."
      );
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
    removeQualification,
  };
};

export default useQualifications;
