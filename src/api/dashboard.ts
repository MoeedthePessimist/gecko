import api from "@/configs/axios";
import { API } from "@/constants/api";
import { GetAdminDashboardDataResponseType } from "@/types/api.type";

export const getAdminDashboardData =
  async (): Promise<GetAdminDashboardDataResponseType> => {
    const response = await api.get(API.GET_ADMIN_DASHBOARD_DATA());
    return response.data;
  };
