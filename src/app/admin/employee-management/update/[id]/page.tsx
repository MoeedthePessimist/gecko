import EmployeeForm from "@/components/forms/employee";
import UpdateEmployeeFormWrapper from "@/components/update-employee-form-wrapper";

import { use } from "react";

export default function UpdateEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return <UpdateEmployeeFormWrapper id={id} />;
}
