"use client";
import AppButton from "@/components/app-button";
import CustomDialogTrigger from "@/components/custom-dialog-trigger";
import ClaimForm from "@/components/forms/claim";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import useClaims, { initialFormState } from "@/hooks/use-claims";
import { DialogClose } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";

const ClaimsRecordPage = () => {
  const {
    openMutationModal,
    setOpenMutationModal,
    claimForm,
    selectedClaimId,
    setSelectedClaimId,
  } = useClaims({
    getClaimsEnabled: true,
  });

  const openModal = () => {
    claimForm.reset({
      ...initialFormState,
    });
    setSelectedClaimId("");
    setOpenMutationModal(true);
  };
  return (
    <div>
      <Dialog open={openMutationModal}>
        <CustomDialogTrigger
          title="Add New Claim"
          icon={<PlusCircle />}
          iconPosition="start"
          containerClasses="bg-accent text-white text-sm float-right md:max-w-[300px] self-end"
          openModal={openModal}
        />
        <DialogContent>
          <DialogTitle>Add Employee Qualification</DialogTitle>
          <Form {...claimForm}>
            <ClaimForm control={claimForm.control} watch={claimForm.watch} />
          </Form>

          <DialogFooter>
            {selectedClaimId ? (
              <AppButton
                title="Update Claim"
                buttonOptions={{
                  className: "bg-secondary text-white",
                  // onClick: handleSubmit(onUpdate),
                }}
                // isLoading={isUpdatingQualification}
              />
            ) : (
              <AppButton
                title="Add Claim"
                buttonOptions={{
                  className: "bg-secondary text-white",
                  // onClick: handleSubmit(onCreate),
                }}
                // isLoading={isCreatingQualification}
              />
            )}
            <DialogClose>
              <AppButton
                title="Close"
                buttonOptions={{
                  className: "bg-accent text-white",
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

export default ClaimsRecordPage;
