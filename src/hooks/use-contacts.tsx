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

const useContacts = () => {
  const [selectedContactId, setSelectedContactId] = useState<string>("");

  const mutateContact = useMutation({
    mutationFn: createContact,
    onSuccess: (data: CreateContactApiResponseType) => {
      console.log("Contact created:", data);
    },
    onError: (error: AxiosError) => {
      console.error("Error creating qualification:", error);
    },
  });

  const editContact = useMutation({
    mutationFn: updateContact,
    onSuccess: (data: CreateContactApiResponseType) => {
      console.log("Contact created:", data);
    },
    onError: (error: AxiosError) => {
      console.error("Error creating qualification:", error);
    },
  });

  const removeContact = useMutation({
    mutationFn: deleteContact,
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
