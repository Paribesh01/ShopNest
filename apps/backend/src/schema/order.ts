import { z } from "zod";

export const createOrderSchema = z.object({
  orderItems: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().positive(),
    })
  ),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  shippingAddress: z.string(),
  notes: z.string().optional(),
});

export const updateOrderSchema = z.object({
  customerName: z.string().optional(),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().optional(),
  notes: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"]),
});
