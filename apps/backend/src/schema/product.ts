import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  imageUrl: z.string().url().optional(),
  categoryId: z.string().optional(),
});
