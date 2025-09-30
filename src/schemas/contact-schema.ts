import { z } from "zod";

export const contactFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty("Please enter a name"),
  relation: z.string().nonempty("Please enter a relation"),
  gender: z.string().nonempty("Please enter a gender"),
  mobileNumber: z.string().nonempty("Please enter a mobile number"),
  email: z
    .string()
    .email("Please enter a valid email")
    .nonempty("Please enter a contact email"),
  homeTelephoneNumber: z.string().optional(),
  workTelephoneNumber: z.string().optional(),
});

export type ContactFormInputs = z.infer<typeof contactFormSchema>;
