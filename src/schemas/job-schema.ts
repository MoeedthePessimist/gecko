import { z } from "zod";

export const jobFormSchema = z.object({
  title: z.string().optional().default(""),
  jobCategory: z.string().optional().default(""),
  designation: z.string().optional().default(""),
  basicRate: z.number().default(0),
  payBasis: z.string().optional().default(""),
  startDate: z.date().optional().default(new Date()),
  endDate: z.date().optional().default(new Date()),
});
export type JobFormInputs = z.infer<typeof jobFormSchema>;
