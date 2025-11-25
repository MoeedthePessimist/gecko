import { z } from "zod";

export const commissionSchema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty("Please select a name"),
  amount: z.number(),
  date: z.date().or(z.string().nonempty("Please select a date")),
  monthToApply: z
    .date()
    .or(z.string().nonempty("Please select the first date of a month")),
  status: z.string().nonempty("Please select a status"),
  employeeId: z.string().nonempty("Please select an employee"),
});

export type CommissionFormInputs = z.infer<typeof commissionSchema>;
