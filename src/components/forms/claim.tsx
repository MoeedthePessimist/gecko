import React, { useEffect } from "react";
import { Control, UseFormWatch, UseWatchProps } from "react-hook-form";
import ControlledSelect from "../controlled-select";
import ControlledInput from "../controlled-input";
import ControlledDatePicker from "../controlled-date-picker";
import { MultiSelect } from "../controlled-multi-select";
import { FileUploader } from "../file-uploader";
import useUpload from "@/hooks/use-upload";
import { ClaimFormInputs } from "@/schemas/claim-schema";
import useClaims from "@/hooks/use-claims";
import SpinnerLoader from "../ui/loader";
import useEmployeeManagement from "@/hooks/use-employee";

type ClaimFormProps = {
  control: Control<ClaimFormInputs>;
  watch: UseFormWatch<ClaimFormInputs>;
};

const ClaimForm: React.FC<ClaimFormProps> = ({ control, watch }) => {
  const { uploadMutation } = useUpload();

  const {
    setAdmins,
    admins,
    getAdminsWithSelectedFields,
    users,
    setUsers,
    getClaimTypesQuery: {
      isSuccess: isClaimTypesQuerySuccess,
      isFetching: isClaimTypesQueryFetching,
      data: claimTypesQueryData,
      isError: isClaimTypesQueryError,
    },
    claimTypes,
    setClaimTypes,
  } = useClaims();

  const {
    getEmployeesQuery: {
      isSuccess: isEmployeesQuerySuccess,
      isFetching: isEmployeesQueryFetching,
      data: employeesQueryData,
      isError: isEmployeesQueryError,
    },
  } = useEmployeeManagement();

  const handleUpload = (file: File) => {
    uploadMutation.mutate(file);
  };

  useEffect(() => {
    if (isEmployeesQuerySuccess) {
      setAdmins(getAdminsWithSelectedFields(employeesQueryData.data));
      setUsers(
        employeesQueryData.data.map((user) => ({
          code: (user.id ?? "").toString(),
          name: user.name,
        }))
      );
    } else if (isEmployeesQueryError) {
      setAdmins([]);
      setUsers([]);
    }
  }, [isEmployeesQuerySuccess, isEmployeesQueryError]);

  useEffect(() => {
    if (isClaimTypesQuerySuccess) {
      setClaimTypes(
        claimTypesQueryData.data.map((claimType) => ({
          code: claimType.name,
          name: claimType.name,
        }))
      );
    } else if (isClaimTypesQueryError) {
      setClaimTypes([]);
    }
  }, [isClaimTypesQueryError, isClaimTypesQueryError]);

  if (isEmployeesQueryFetching || isClaimTypesQueryFetching) {
    return <SpinnerLoader size="sm" />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 my-4 max-h-[300px] overflow-scroll">
      <ControlledSelect
        name="name"
        control={control}
        label="Name"
        placeholder="Please select a name/type"
        list={claimTypes}
      />

      <ControlledInput
        name="amount"
        control={control}
        label="Amount"
        placeholder="Please enter an amount"
        type="number"
      />

      <ControlledDatePicker
        control={control}
        name={"transactionDate"}
        label={"Transaction Date"}
        placeholder="Please select a transaction date (future)"
      />

      <ControlledDatePicker
        control={control}
        name={"monthToApply"}
        label={"Month to Apply"}
        placeholder="Please select a month to apply"
      />

      <MultiSelect
        control={control}
        name="emailTo"
        options={admins}
        placeholder="Please select admins"
        label="Email To"
      />

      <ControlledSelect
        control={control}
        name="user"
        placeholder="Please select an employee"
        label="Employee"
        list={users}
      />

      <FileUploader
        onSelected={handleUpload}
        fileName={watch("fileName")}
        label="Attach File"
      />
    </div>
  );
};

export default ClaimForm;
