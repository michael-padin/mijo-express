import { z } from "zod";

export const RegisterSchema = z
  .object({
    fullName: z.string().min(3),
    email: z.string().email(),
    address: z.string().min(3),
    contact: z.string().refine(
      (value) => {
        const contactNumberRegex = /^09\d{9}$/; // Pattern for a 10-digit number starting with '09'
        return contactNumberRegex.test(value);
      },
      {
        message: "Invalid contact number format",
      }
    ),
    role: z.enum(["provider", "customer"]),
    skills: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof RegisterSchema>;
