"use client";

import CustomDialogTrigger from "@/components/custom-dialog-trigger";
import { DataTable } from "@/components/data-table";
import CommissionRecordForm from "@/components/forms/commission-record";
import { Dialog } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import SpinnerLoader from "@/components/ui/loader";
import useCommission from "@/hooks/use-commission";
import { PlusCircle } from "lucide-react";
import React from "react";

const CommissionsRecordPage = () => {
  const {
    getCommissionsQuery,
    commissionColumns,
    openMutationModal,
    closeMutationModal,
    commissionForm,
    selectedCommissionid,
  } = useCommission(true);

  if (getCommissionsQuery.isFetching || getCommissionsQuery.isRefetching) {
    return <SpinnerLoader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Dialog>
        <CustomDialogTrigger
          title="Add New Commission"
          icon={<PlusCircle />}
          iconPosition="start"
          containerClasses="bg-accent text-white text-sm float-right md:max-w-[300px] self-end"
          openModal={openMutationModal}
        />
        <Form {...commissionForm}>
          <CommissionRecordForm
            control={commissionForm.control}
            selectedCommissionId={selectedCommissionid}
            closeMutationModal={closeMutationModal}
            handleSubmit={commissionForm.handleSubmit}
          />
        </Form>
      </Dialog>
      {getCommissionsQuery.isSuccess && (
        <DataTable
          columns={commissionColumns}
          data={getCommissionsQuery.data.data}
          title="Commission Records"
        />
      )}
    </div>
  );
};

export default CommissionsRecordPage;
