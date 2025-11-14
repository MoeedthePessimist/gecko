import api from "@/configs/axios";
import { API } from "@/constants/api";
import { GetClaimTypesResponse } from "@/types/api.type";

export const getClaimTypes = async (): Promise<GetClaimTypesResponse> => {
  const response = await api.get(API.GET_CLAIM_TYPES);
  return response.data;
};
