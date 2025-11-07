import React from "react";
import { Control, UseFormWatch, UseWatchProps } from "react-hook-form";
import ControlledSelect from "../controlled-select";
import ControlledInput from "../controlled-input";
import ControlledDatePicker from "../controlled-date-picker";
import { MultiSelect } from "../controlled-multi-select";
import { FileUploader } from "../file-uploader";
import useUpload from "@/hooks/use-upload";
import { ClaimFormInputs } from "@/schemas/claim-schema";

type ClaimFormProps = {
  control: Control<ClaimFormInputs>;
  watch: UseFormWatch<ClaimFormInputs>;
};

const ClaimForm: React.FC<ClaimFormProps> = ({ control, watch }) => {
  const { uploadMutation } = useUpload();

  const handleUpload = (file: File) => {
    uploadMutation.mutate(file);
  };

  return (
    <div className="grid grid-cols-1 gap-4 my-4">
      <ControlledSelect
        name="name"
        control={control}
        label="Name"
        placeholder="Please select a name/type"
        list={[]}
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
        options={[
          { label: "a", value: "a" },
          {
            label: "b",
            value: "b",
          },
        ]}
        placeholder="Please select admins to email to"
        label="Email To"
      />

      <ControlledSelect
        control={control}
        name="user"
        placeholder="Please select an employee"
        label="Employee"
        list={[]}
      />

      <FileUploader onSelected={handleUpload} fileName={watch("fileName")} />
    </div>
  );
};

export default ClaimForm;
