export const API = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "/user/me",
  CREATE_QUALIFICATION: "/qualification",
  GET_QUALIFICATION: "/qualification",
  UPDATE_QUALIFICATION: (id: string) => `/qualification/${id}`,
  DELETE_QUALIFICATION: (id: string) => `/qualification/${id}`,
};
