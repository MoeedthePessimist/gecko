import {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
} from "@/api/contacts";
import { CreateContactApiResponseType } from "@/types/api.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTypedQuery } from "./use-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useState } from "react";
import { useGlobalModal } from "@/context/error-context";
import { AxiosErrorWithMessage } from "@/types/common.type";

const useContacts = () => {
  const [selectedContactId, setSelectedContactId] = useState<string>("");

  const { showError, showSuccess } = useGlobalModal();

  const mutateContact = useMutation({
    mutationFn: createContact,
    onSuccess: (data: CreateContactApiResponseType) => {
      console.log("Contact created:", data);
      showSuccess("Contact created successfully!");
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error("Error creating qualification:", error);
      showError(
        error.response?.data.message ||
          "Failed to create contact. Please try again."
      );
    },
  });

  const editContact = useMutation({
    mutationFn: updateContact,
    onSuccess: (data: CreateContactApiResponseType) => {
      console.log("Contact created:", data);
      showSuccess("Contact updated successfully!");
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error("Error creating qualification:", error);
      showError(
        error.response?.data.message ||
          "Failed to update contact. Please try again."
      );
    },
  });

  const removeContact = useMutation({
    mutationFn: deleteContact,
    onSuccess: (data) => {
      console.log("Contact deleted:", data);
      showSuccess("Contact deleted successfully!");
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error("Error deleting qualification:", error);
      showError(
        error.response?.data.message ||
          "Failed to delete contact. Please try again."
      );
    },
  });

  const queryContacts = useTypedQuery({
    queryKey: QUERY_KEYS.CONTACTS,
    queryFn: async () => getContacts(),
  });

  const [mutationModalOpen, setMutationModalOpen] = useState<boolean>(false);

  return {
    mutateContact,
    queryContacts,
    setSelectedContactId,
    selectedContactId,
    mutationModalOpen,
    setMutationModalOpen,
    editContact,
    removeContact,
  };
};

export default useContacts;
