"use client";

import AppButton from "@/components/app-button";
import CustomDialogTrigger from "@/components/custom-dialog-trigger";
import { Dialog, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import useLeave from "@/hooks/use-leave";
import useUpload from "@/hooks/use-upload";
import { LeaveWithNecessaryFields } from "@/types/leave.type";
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
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
  } = useLeave(setLeaves);

  const {
    uploadMutation: {
      mutate: uploadMutate,
      isPending: isUploadingPending,
      isSuccess: isUploadSuccess,
      data: uploadData,
    },
  } = useUpload();

  // useEffect(() => {
  //   if (isUploadSuccess) {
  //     claimForm.setValue("fileName", uploadData.data.fileName);
  //   }
  // }, [isUploadSuccess]);

  return (
    <div>
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
            <></>
            {/* <ClaimForm
              control={claimForm.control}
              watch={claimForm.watch}
              uploadMutate={uploadMutate}
            /> */}
          </Form>

          <DialogFooter className="flex flex-row justify-end">
            <AppButton
              title={selectedLeaveId ? "Update Claim" : "Add Claim"}
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
