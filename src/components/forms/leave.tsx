import React, { useEffect } from "react";
import { Control, UseFormWatch } from "react-hook-form";
import ControlledSelect from "../controlled-select";
import ControlledInput from "../controlled-input";
import ControlledDatePicker from "../controlled-date-picker";
import { MultiSelect } from "../controlled-multi-select";
import { FileUploader } from "../file-uploader";
import { LeaveFormInputs } from "@/schemas/leave-schema";
import useClaims from "@/hooks/use-claims";
import SpinnerLoader from "../ui/loader";
import useEmployeeManagement from "@/hooks/use-employee";
import { UseMutateFunction } from "@tanstack/react-query";
import { UploadFileApiResponseType } from "@/types/api.type";
import { getAdminsWithSelectedFields } from "@/lib/utils";
import { MultiSelectOptionType, SelectOptionsType } from "@/types/common.type";
import {
  applicationsStatusesEnum,
  applicationsStatusesEnumList,
  applicationsStatusesEnumListWithCode,
} from "@/enums/statuses.enum";

type LeaveFormProps = {
  control: Control<LeaveFormInputs>;
  watch: UseFormWatch<LeaveFormInputs>;
  uploadMutate: UseMutateFunction<
    UploadFileApiResponseType,
    Error,
    File,
    unknown
  >;
  admins: Array<MultiSelectOptionType>;
  users: Array<SelectOptionsType>;
};

const LeaveForm: React.FC<LeaveFormProps> = ({
  control,
  watch,
  uploadMutate,
  admins,
  users,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 my-4 max-h-[300px] lg:max-h-[500px] overflow-y-scroll lg:overflow-auto">
      <ControlledSelect
        name="type"
        control={control}
        label="Name"
        placeholder="Please select a name/type"
        list={[]}
      />

      <ControlledDatePicker
        control={control}
        name={"from"}
        label={"From Date"}
        placeholder="Please select a from date"
      />

      <ControlledDatePicker
        control={control}
        name={"to"}
        label={"To Date"}
        placeholder="Please select a to date"
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

      <ControlledSelect
        control={control}
        name="status"
        placeholder="Please select the application status"
        label="Status"
        list={applicationsStatusesEnumListWithCode}
      />

      {/* <FileUploader
        onSelected={handleUpload}
        fileName={watch("fileName")}
        label="Attach File"
      /> */}
    </div>
  );
};

export default LeaveForm;
