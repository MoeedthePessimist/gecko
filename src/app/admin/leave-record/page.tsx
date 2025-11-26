"use client";

import useLeave from "@/hooks/use-leave";
import { LeaveWithNecessaryFields } from "@/types/leave.type";
import React, { useState } from "react";

const LeaveRecordPage = () => {
  const [leaves, setLeaves] = useState<Array<LeaveWithNecessaryFields>>([]);

  const {} = useLeave(setLeaves);

  console.log(leaves, "leaves");

  return <div>LeaveRecordPage</div>;
};

export default LeaveRecordPage;
