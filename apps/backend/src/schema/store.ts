import { z } from "zod";

export const storeSchema = z.object({
  name: z.string().min(2),
});
