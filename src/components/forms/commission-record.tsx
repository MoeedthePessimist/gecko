import useGetEmployees from "@/hooks/use-get-employees";
import React, { useEffect, useState } from "react";
import { DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { CommissionFormInputs } from "@/schemas/commission-schema";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import ControlledInput from "../controlled-input";
import ControlledSelect from "../controlled-select";
import { allowanceCommissionTypesWithCode } from "@/enums/allowance-types.enum";
import ControlledDatePicker from "../controlled-date-picker";
import AppButton from "../app-button";
import { DialogClose } from "@radix-ui/react-dialog";
import useCommission from "@/hooks/use-commission";
import { SelectOptionsType } from "@/types/common.type";
import { applicationsStatusesEnumListWithCode } from "@/enums/statuses.enum";
import SpinnerLoader from "../ui/loader";

type CommissionRecordFormProps = {
  control: Control<CommissionFormInputs>;
  selectedCommissionId?: string;
  closeMutationModal: () => void;
  handleSubmit: UseFormHandleSubmit<CommissionFormInputs>;
};

const CommissionRecordForm: React.FC<CommissionRecordFormProps> = ({
  control,
  selectedCommissionId,
  closeMutationModal,
  handleSubmit,
}) => {
  const {
    getEmployeesQuery: {
      data: employeesData,
      isFetching: isFetchingEmployees,
      isSuccess: isFetchedEmployeesSuccess,
    },
  } = useGetEmployees();

  const [employees, setEmployees] = useState<Array<SelectOptionsType>>([]);

  const { createCommissionMutation, updateCommissionMutation } =
    useCommission();

  useEffect(() => {
    if (isFetchedEmployeesSuccess) {
      setEmployees(
        employeesData.data.map((employee) => ({
          code: employee.id || employee.name,
          name: employee.name,
        }))
      );
    }
  }, [isFetchedEmployeesSuccess]);

  if (isFetchingEmployees) {
    return <SpinnerLoader size="sm" />;
  }

  return (
    <DialogContent>
      <DialogTitle>
        {selectedCommissionId ? "Update" : "Add"} Commission
      </DialogTitle>
      <div className="grid grid-cols-1 gap-4 my-4">
        <ControlledSelect<CommissionFormInputs>
          control={control as Control<CommissionFormInputs>}
          name={`name`}
          placeholder="Select Commission Type"
          label="Commission Type"
          list={allowanceCommissionTypesWithCode}
        />
        <ControlledInput<CommissionFormInputs>
          control={control as Control<CommissionFormInputs>}
          name={`amount`}
          placeholder="Add Amount"
          label="Amount"
          type="number"
        />
        <ControlledDatePicker<CommissionFormInputs>
          control={control as Control<CommissionFormInputs>}
          name={"date"}
          placeholder="Select Date"
          label="Date"
        />
        <ControlledDatePicker<CommissionFormInputs>
          control={control as Control<CommissionFormInputs>}
          name={"monthToApply"}
          placeholder="Select Month To Apply"
          label="Month To Apply"
        />
        <ControlledSelect<CommissionFormInputs>
          control={control as Control<CommissionFormInputs>}
          name={`status`}
          placeholder="Select Status"
          label="Status"
          list={applicationsStatusesEnumListWithCode}
        />
        <ControlledSelect<CommissionFormInputs>
          control={control as Control<CommissionFormInputs>}
          name={`employeeId`}
          placeholder="Select Employee"
          label="Employee"
          list={employees}
        />
      </div>
      <DialogFooter>
        {selectedCommissionId ? (
          <AppButton
            title="Update Commission"
            buttonOptions={{
              className: "bg-secondary text-white",
              // onClick: handleSubmit(onUpdate),
            }}
            // isLoading={editContact.isPending}
          />
        ) : (
          <AppButton
            title="Add Commission"
            buttonOptions={{
              className: "bg-secondary text-white",
              // onClick: handleSubmit(onCreate),
            }}
            // isLoading={mutateContact.isPending}
          />
        )}
        <DialogClose>
          <AppButton
            title="Close"
            buttonOptions={{
              className: "bg-accent text-white",
              onClick: closeMutationModal,
            }}
          />
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default CommissionRecordForm;
