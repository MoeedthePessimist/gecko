import api from "@/configs/axios";
import { API } from "@/constants/api";
import {
  CreateContactApiRequestType,
  CreateContactApiResponseType,
  DeleteContactApiResponseType,
  GetContactsApiResponseType,
  UpdateContactApiRequestType,
  UpdateContactApiResponseType,
} from "@/types/api.type";

export const getContacts = async (): Promise<GetContactsApiResponseType> => {
  const response = await api.get(API.GET_CONTACT);
  return response.data;
};

export const createContact = async (
  data: CreateContactApiRequestType
): Promise<CreateContactApiResponseType> => {
  const response = await api.post(API.CREATE_CONTACT, data);
  return response.data;
};

export const updateContact = async (
  data: UpdateContactApiRequestType
): Promise<UpdateContactApiResponseType> => {
  const response = await api.patch(API.UPDATE_CONTACT(data.id), data);
  return response.data;
};

export const deleteContact = async (
  id: string
): Promise<DeleteContactApiResponseType> => {
  const response = await api.delete(API.DELETE_CONTACT(id));
  return response.data;
};
