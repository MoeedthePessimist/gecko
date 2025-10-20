"use client";

import { DataTable } from "@/components/data-table";
import SpinnerLoader from "@/components/ui/loader";
import useCommission from "@/hooks/use-commission";
import React from "react";

const CommissionsRecordPage = () => {
  const { getCommissionsQuery, commissionColumns } = useCommission();

  if (getCommissionsQuery.isFetching || getCommissionsQuery.isRefetching) {
    return <SpinnerLoader />;
  }

  return (
    <div>
      {getCommissionsQuery.isSuccess && (
        <DataTable
          columns={commissionColumns}
          data={getCommissionsQuery.data.data}
        />
      )}
    </div>
  );
};

export default CommissionsRecordPage;
