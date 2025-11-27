import { applicationsStatusesEnum } from "@/enums/statuses.enum";
import { start } from "repl";
import { z } from "zod";

export const leaveFormSchema = z.object({
  id: z.string().optional(),
  type: z.string().nonempty("Please select leave type"),
  from: z.date().min(new Date(), "Please select a future date"),
  to: z.date().min(new Date(), "Please select a future date"),
  totalDays: z.number().min(1, "Total days must be at least 1"),
  monthToApply: z.date().nullable().optional(),
  files: z.array(z.string()).optional(),
  emailTo: z.array(z.string().email("Please enter a valid email")).optional(),
  remarks: z.string().optional(),
  status: z.string().optional(),
  userId: z.string().nonempty("Please select a user"),
});

export type LeaveFormInputs = z.infer<typeof leaveFormSchema>;
