import { z } from "zod";

export const claimFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty("Please select a name"),
  amount: z.number().nonnegative("Please enter a valid amount"),
  transactionDate: z.date().min(new Date(), "Please select a future date"),
  monthToApply: z.date().nullable(),
  fileName: z.string().optional(),
  emailTo: z.array(z.string()),
  user: z.string().nonempty("Please select a user"),
});

export type ClaimFormInputs = z.infer<typeof claimFormSchema>;
