import { z } from "zod";

export const appointmentSchema = z.object({
  //date: z.coerce.date(),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email.")
    .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
  service: z.string().min(1, "Service is required."),
  isPublished: z.boolean(),
});

export const createCustomerSchema = z.object({
  firstname: z.string().min(1).max(255),
  lastname:z.string().min(1).max(255),
  email:z.string()
  .min(1, { message: "This field has to be filled." })
  .email("This is not a valid email."),
 // .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
  phone:z.string().min(10).max(14).optional(),
});
