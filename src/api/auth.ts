import api from "@/configs/axios";
import { API } from "@/constants/api";
import {
  LoginApiRequestType,
  LoginApiResponseType,
  RegisterApiRequestType,
  RegisterApiResponseType,
} from "@/types/api.type";

export const login = async (
  data: LoginApiRequestType
): Promise<LoginApiResponseType> => {
  const response = await api.post(API.LOGIN, data);
  return response.data;
};

export const register = async (
  data: RegisterApiRequestType
): Promise<RegisterApiResponseType> => {
  const response = await api.post(API.REGISTER, data);
  return response.data;
};
