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

const useDocuments = () => {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string>("");

  const mutateDocument = useMutation({
    mutationFn: createDocument,
    onSuccess: (data: CreateDocumentApiResponseType) => {
      console.log("Document created:", data);
    },
    onError: (error: AxiosError) => {
      console.error("Error creating qualification:", error);
    },
  });

  const editDocument = useMutation({
    mutationFn: updateDocument,
    onSuccess: (data: CreateDocumentApiResponseType) => {
      console.log("Document created:", data);
    },
    onError: (error: AxiosError) => {
      console.error("Error creating qualification:", error);
    },
  });

  const removeDocument = useMutation({
    mutationFn: deleteDocument,
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
