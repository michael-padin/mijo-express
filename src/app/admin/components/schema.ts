/** @format */

import { z } from "zod";

export const transactionSchema = z.object({
  id: z.string(),
  name: z.string(),
  progress: z.string(),
  status: z.string(),
  date: z.string(),
});

export type Transaction = z.infer<typeof transactionSchema>;
