"use client";

import AppButton from "@/components/app-button";
import CustomDialogTrigger from "@/components/custom-dialog-trigger";
import LeaveForm from "@/components/forms/leave";
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import useLeave from "@/hooks/use-leave";
import useUpload from "@/hooks/use-upload";
import { LeaveWithNecessaryFields } from "@/types/leave.type";

import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

const LeaveRecordPage = () => {
  const [leaves, setLeaves] = useState<Array<LeaveWithNecessaryFields>>([]);

  const {
    openMutationModal,
    setOpenMutationModal,
    openModal,
    selectedLeaveId,
    leaveForm,
    onDelete,
    onMutate,
    isLeaveMutatePending,
    isLeaveDeletePending,
    handleUpload,
    isUploadingPending,
    admins,
    users,
  } = useLeave(setLeaves);

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={openMutationModal}>
        <CustomDialogTrigger
          title="Add New Leave"
          icon={<PlusCircle />}
          iconPosition="start"
          containerClasses="bg-accent text-white text-sm float-right md:max-w-[300px] self-end"
          openModal={openModal}
        />
        <DialogContent>
          <DialogTitle>Add Employee Leave</DialogTitle>
          <Form {...leaveForm}>
            <LeaveForm
              control={leaveForm.control}
              watch={leaveForm.watch}
              handleUpload={handleUpload}
              admins={admins}
              users={users}
            />
          </Form>

          <DialogFooter className="flex flex-row justify-end">
            <AppButton
              title={selectedLeaveId ? "Update Leave" : "Add Leave"}
              buttonOptions={{
                className: "bg-secondary text-white max-w-auto",
                onClick: leaveForm.handleSubmit(onMutate),
                disabled: isUploadingPending || isLeaveMutatePending,
              }}
              isLoading={isLeaveMutatePending}
            />
            <DialogClose>
              <AppButton
                title="Close"
                buttonOptions={{
                  className: "bg-accent text-white max-w-auto",
                  onClick: () => setOpenMutationModal(false),
                }}
              />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveRecordPage;
