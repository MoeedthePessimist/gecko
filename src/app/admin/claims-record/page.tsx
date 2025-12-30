"use client";
import AppButton from "@/components/app-button";
import CustomDialogTrigger from "@/components/custom-dialog-trigger";
import ClaimForm from "@/components/forms/claim";
import { DataTable } from "@/components/ui/data-table";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import useClaims, { initialFormState } from "@/hooks/use-claims";
import useUpload from "@/hooks/use-upload";
import { DialogClose } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { useEffect } from "react";

const ClaimsRecordPage = () => {
  const {
    openMutationModal,
    setOpenMutationModal,
    claimForm,
    selectedClaimId,
    setSelectedClaimId,
    onMutate,
    columns,
    claims,
    mutateClaimMutation: { isPending: isMutateClaimPending },
  } = useClaims({
    getClaimsEnabled: true,
  });

  const {
    uploadMutation: {
      mutate: uploadMutate,
      isPending: isUploadingPending,
      isSuccess: isUploadSuccess,
      data: uploadData,
    },
  } = useUpload();

  const openModal = () => {
    claimForm.reset({
      ...initialFormState,
    });
    setSelectedClaimId("");
    setOpenMutationModal(true);
  };

  useEffect(() => {
    if (isUploadSuccess) {
      claimForm.setValue("fileName", uploadData.data.url);
    }
  }, [isUploadSuccess]);

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={openMutationModal}>
        <CustomDialogTrigger
          title="Add New Claim"
          icon={<PlusCircle />}
          iconPosition="start"
          containerClasses="bg-accent text-white text-sm float-right md:max-w-[300px] self-end"
          openModal={openModal}
        />
        <DialogContent>
          <DialogTitle>Add Employee Claim</DialogTitle>
          <Form {...claimForm}>
            <ClaimForm
              control={claimForm.control}
              watch={claimForm.watch}
              uploadMutate={uploadMutate}
            />
          </Form>

          <DialogFooter className="flex flex-row justify-end">
            <AppButton
              title={selectedClaimId ? "Update Claim" : "Add Claim"}
              buttonOptions={{
                className: "bg-secondary text-white max-w-auto",
                onClick: claimForm.handleSubmit(onMutate),
                disabled: isUploadingPending || isMutateClaimPending,
              }}
              isLoading={isMutateClaimPending}
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

      <DataTable columns={columns} data={claims} />
    </div>
  );
};

export default ClaimsRecordPage;
