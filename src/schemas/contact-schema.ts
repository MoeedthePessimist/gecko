import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().optional(),
  relation: z.string().optional(),
  gender: z.string().optional(),
  mobileNumber: z.string().optional(),
  email: z.string().optional(),
});

export type ContactFormInputs = z.infer<typeof contactFormSchema>;
