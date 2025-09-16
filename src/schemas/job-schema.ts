import { z } from "zod";

export const jobFormSchema = z.object({
  title: z.string().optional(),
  jobCategory: z.string().optional(),
  designation: z.string().optional(),
  basicRate: z.number(),
  payBasis: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});
export type JobFormInputs = z.infer<typeof jobFormSchema>;
