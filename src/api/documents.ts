import api from "@/configs/axios";
import { API } from "@/constants/api";
import {
  CreateDocumentApiRequestType,
  CreateDocumentApiResponseType,
  DeleteDocumentApiResponseType,
  GetDocumentsApiResponseType,
  UpdateDocumentApiRequestType,
  UpdateDocumentApiResponseType,
} from "@/types/api.type";

export const getDocuments = async (): Promise<GetDocumentsApiResponseType> => {
  const response = await api.get(API.GET_DOCUMENT);
  return response.data;
};

export const createDocument = async (
  data: CreateDocumentApiRequestType
): Promise<CreateDocumentApiResponseType> => {
  const response = await api.post(API.CREATE_DOCUMENT, data);
  return response.data;
};

export const updateDocument = async (
  data: UpdateDocumentApiRequestType
): Promise<UpdateDocumentApiResponseType> => {
  const response = await api.patch(API.UPDATE_DOCUMENT(data.id), data);
  return response.data;
};

export const deleteDocument = async (
  id: string
): Promise<DeleteDocumentApiResponseType> => {
  const response = await api.delete(API.DELETE_DOCUMENT(id));
  return response.data;
};
