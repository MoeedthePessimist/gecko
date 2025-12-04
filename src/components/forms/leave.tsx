import React from "react";
import { Control, UseFormWatch } from "react-hook-form";
import ControlledSelect from "../controlled-select";
import ControlledInput from "../controlled-input";
import ControlledDatePicker from "../controlled-date-picker";
import { MultiSelect } from "../controlled-multi-select";
import { FileUploader } from "../file-uploader";
import { LeaveFormInputs } from "@/schemas/leave-schema";
import { MultiSelectOptionType, SelectOptionsType } from "@/types/common.type";
import { applicationsStatusesEnumListWithCode } from "@/enums/statuses.enum";
import LeaveTypesList from "../../../public/data/leave-types.json";
import LeaveInfoPanel from "../leave-info-panel";

type LeaveFormProps = {
  control: Control<LeaveFormInputs>;
  watch: UseFormWatch<LeaveFormInputs>;
  handleUpload: (file: File) => void;
  admins: Array<MultiSelectOptionType>;
  users: Array<SelectOptionsType>;
};

const LeaveForm: React.FC<LeaveFormProps> = ({
  control,
  watch,
  handleUpload,
  admins,
  users,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="grid grid-cols-1 gap-4 my-4 max-h-[300px] lg:max-h-[500px] overflow-y-scroll lg:overflow-auto">
        <ControlledSelect
          name="type"
          control={control}
          label="Name"
          placeholder="Please select a name/type"
          list={LeaveTypesList}
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

        <ControlledInput
          control={control}
          name="totalDays"
          placeholder="Total days of leave"
          label="Total Days"
          type="number"
          contentEditable={false}
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

        <FileUploader
          onSelected={handleUpload}
          fileName={watch("file")}
          label="Attach File"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 my-4 max-h-[300px] lg:max-h-[500px] overflow-y-scroll lg:overflow-auto">
        <LeaveInfoPanel />
      </div>
    </div>
  );
};

export default LeaveForm;
