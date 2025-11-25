import { LeaveWithNecessaryFields } from "@/types/leave.type";
import React, { useState } from "react";

const LeaveRecordPage = () => {
  const [leaves, setLeaves] = useState<Array<LeaveWithNecessaryFields>>([]);

  return <div>LeaveRecordPage</div>;
};

export default LeaveRecordPage;
