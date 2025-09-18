import api from "@/configs/axios";
import { API } from "@/constants/api";
import {
  CreateEmployeeRequestType,
  CreateEmployeeResponseType,
  MeApiResponseType,
} from "@/types/api.type";

export const me = async (): Promise<MeApiResponseType> => {
  const response = await api.get(API.ME);
  return response.data;
};

export const createEmployee = async (
  data: CreateEmployeeRequestType
): Promise<CreateEmployeeResponseType> => {
  const response = await api.post(API.CREATE_EMPLOYEE, data);
  return response.data;
};
