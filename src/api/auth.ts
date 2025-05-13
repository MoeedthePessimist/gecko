import api from "@/configs/axios";
import {
  LoginApiRequestType,
  LoginApiResponseType,
  RegisterApiRequestType,
  RegisterApiResponseType,
} from "@/types/api.type";

export const login = async (
  data: LoginApiRequestType
): Promise<LoginApiResponseType> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (
  data: RegisterApiRequestType
): Promise<RegisterApiResponseType> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
