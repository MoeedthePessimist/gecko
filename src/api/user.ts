import api from "@/configs/axios";
import { API } from "@/constants/api";
import { MeApiResponseType } from "@/types/api.type";

export const me = async (): Promise<MeApiResponseType> => {
  const response = await api.get(API.ME);
  return response.data;
};
