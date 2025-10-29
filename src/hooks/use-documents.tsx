import {
  createDocument,
  deleteDocument,
  getDocuments,
  updateDocument,
} from "@/api/documents";
import { CreateDocumentApiResponseType } from "@/types/api.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTypedQuery } from "./use-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useState } from "react";
import { useGlobalModal } from "@/context/error-context";
import { AxiosErrorWithMessage } from "@/types/common.type";

const useDocuments = () => {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string>("");
  const { showError, showSuccess } = useGlobalModal();

  const mutateDocument = useMutation({
    mutationFn: createDocument,
    onSuccess: (data: CreateDocumentApiResponseType) => {
      console.log("Document created:", data);
      showSuccess("Document created successfully!");
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error("Error creating qualification:", error);
      showError(
        error.response?.data.message ||
          "Failed to create document. Please try again."
      );
    },
  });

  const editDocument = useMutation({
    mutationFn: updateDocument,
    onSuccess: (data: CreateDocumentApiResponseType) => {
      console.log("Document created:", data);
      showSuccess("Document updated successfully!");
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error("Error creating qualification:", error);
      showError(
        error.response?.data.message ||
          "Failed to update document. Please try again."
      );
    },
  });

  const removeDocument = useMutation({
    mutationFn: deleteDocument,
    onSuccess: (data) => {
      console.log("Document deleted:", data);
      showSuccess("Document deleted successfully!");
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error("Error deleting qualification:", error);
      showError(
        error.response?.data.message ||
          "Failed to delete document. Please try again."
      );
    },
  });

  const queryDocuments = useTypedQuery({
    queryKey: QUERY_KEYS.DOCUMENTS,
    queryFn: async () => getDocuments(),
  });

  const [mutationModalOpen, setMutationModalOpen] = useState<boolean>(false);

  return {
    mutateDocument,
    queryDocuments,
    setSelectedDocumentId,
    selectedDocumentId,
    mutationModalOpen,
    setMutationModalOpen,
    editDocument,
    removeDocument,
  };
};

export default useDocuments;
