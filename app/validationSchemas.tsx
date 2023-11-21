import { z } from 'zod';

export const appointmentSchema = z.object({
  date: z.coerce.date(),
  mail: z
  .string()
  .min(1, { message: "This field has to be filled." })
  .email("This is not a valid email.")
  .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
  service: z.string().min(1, 'Service is required.'),
  isPublished: z.boolean(),
});