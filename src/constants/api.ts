export const API = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "/user/me",
  CREATE_QUALIFICATION: "/qualification",
  GET_QUALIFICATION: "/qualification",
  UPDATE_QUALIFICATION: (id: string) => `/qualification/${id}`,
  DELETE_QUALIFICATION: (id: string) => `/qualification/${id}`,
  CREATE_CONTACT: "/contact",
  GET_CONTACT: "/contact",
  UPDATE_CONTACT: (id: string) => `/contact/${id}`,
  DELETE_CONTACT: (id: string) => `/contact/${id}`,
};
