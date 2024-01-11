import { z } from "zod";

export const RegisterSchema = z
  .object({
    fullName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string().min(3),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof RegisterSchema>;
