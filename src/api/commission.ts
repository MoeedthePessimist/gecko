import api from "@/configs/axios";
import { API } from "@/constants/api";
import {
  CreateCommissionRequestType,
  CreateCommissionResponseType,
  DeleteCommissionResponseType,
  GetCommissionDataResponseType,
  UpdateCommissionRequestType,
  UpdateCommissionResponseType,
} from "@/types/api.type";

export const getCommissions =
  async (): Promise<GetCommissionDataResponseType> => {
    const response = await api.get(API.GET_COMMISSIONS());
    return response.data;
  };

export const createCommission = async (
  data: CreateCommissionRequestType
): Promise<CreateCommissionResponseType> => {
  const response = await api.post(API.CREATE_COMMISSION, data);
  return response.data;
};

export const updateCommission = async (
  data: UpdateCommissionRequestType
): Promise<UpdateCommissionResponseType> => {
  const response = await api.patch(API.UPDATE_COMMISSION(data.id), data.data);
  return response.data;
};

export const deleteCommission = async (
  id: string
): Promise<DeleteCommissionResponseType> => {
  const response = await api.delete(API.DELETE_COMMISSION(id));
  return response.data;
};
