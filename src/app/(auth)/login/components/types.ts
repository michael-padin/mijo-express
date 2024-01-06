import { z } from "zod";

export const registerFormSchema = z.object({
  email: z.string().min(1),
  password: z.string().email().min(1),
});

export type FormData = z.infer<typeof registerFormSchema>;
