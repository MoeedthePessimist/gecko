import React from "react";
import { useTypedQuery } from "./use-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getEmployees } from "@/api/user";

const useGetEmployees = () => {
  const getEmployeesQuery = useTypedQuery({
    queryKey: QUERY_KEYS.USERS(""),
    queryFn: getEmployees,
  });
  return {
    getEmployeesQuery,
  };
};

export default useGetEmployees;
