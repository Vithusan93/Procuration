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
  lastname: z.string().min(1).max(255),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  // .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
  phone: z.string().min(10).max(14).optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(1).max(255),
  description: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(255),
  price: z.string(),
  stock: z.string(),
});

export const createServiceSchema = z.object({
  name: z.string().min(1).max(255),
  duration: z.string(),
  price: z.string(),
});

export const createStaffSchema = z.object({
  firstname: z.string().min(1).max(255),
  lastname: z.string().min(1).max(255),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  // .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
  phone: z.string().min(10).max(14).optional(),
});

export const createAppointmentSchema = z.object({
  customerId: z.string().min(1).max(255),
  staffId: z.string().min(1).max(255),
  serviceId: z.string().min(1).max(255),
  time: z.date(),
});
