export const API = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "/user/me",
  CREATE_QUALIFICATION: "/qualifications",
  GET_QUALIFICATIONS: "/qualifications",
  UPDATE_QUALIFICATIONS: (id: string) => `/qualifications/${id}`,
  DELETE_QUALIFICATIONS: (id: string) => `/qualifications/${id}`,
};
