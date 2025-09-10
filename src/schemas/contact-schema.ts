import { z } from "zod";

export const contactFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional().default(""),
  relation: z.string().optional().default(""),
  gender: z.string().optional().default(""),
  mobileNumber: z.string().optional().default(""),
  email: z.string().email("Please enter a valid email").optional().default(""),
  homeTelephoneNumber: z.string().optional().default(""),
  workTelephoneNumber: z.string().optional().default(""),
});

export type ContactFormInputs = z.infer<typeof contactFormSchema>;
