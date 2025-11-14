import api from "@/configs/axios";
import { API } from "@/constants/api";
import {
  DeleteClaimResponse,
  GetClaimsResponse,
  MutateClaimRequest,
  MutateClaimResponse,
} from "@/types/api.type";
import { ClaimWithNecessaryFields } from "@/types/claim.type";

export const getClaims = async (): Promise<GetClaimsResponse> => {
  const response = await api.get(API.GET_CLAIMS);
  return response.data;
};

export const mutateClaim = async (
  payload: MutateClaimRequest
): Promise<MutateClaimResponse> => {
  const response = await api.post(API.MUTATE_CLAIM, payload);
  return response.data;
};

export const deleteClaim = async (id: string): Promise<DeleteClaimResponse> => {
  const response = await api.delete(API.DELETE_CLAIM(id));
  return response.data;
};
