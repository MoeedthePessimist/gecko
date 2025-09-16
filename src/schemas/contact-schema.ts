import { z } from "zod";

export const contactFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  relation: z.string().optional(),
  gender: z.string().optional(),
  mobileNumber: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional(),
  homeTelephoneNumber: z.string().optional(),
  workTelephoneNumber: z.string().optional(),
});

export type ContactFormInputs = z.infer<typeof contactFormSchema>;
