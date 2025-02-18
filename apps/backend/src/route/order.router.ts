import express from "express";
import { authenticateToken } from "../middleware/auth";
import {
  createOrder,
  getStoreOrders,
  updateOrderStatus,
  getOrderDetails,
  updateOrder,
  deleteOrder,
} from "../controller/order.controller";
import { validateSchema } from "../middleware/validateData";
import {
  createOrderSchema,
  updateOrderStatusSchema,
  updateOrderSchema,
} from "../schema/order";

const orderRouter = express.Router();

orderRouter.post("/:storeId", validateSchema(createOrderSchema), createOrder);

orderRouter.get("/:storeId", authenticateToken(), getStoreOrders);

orderRouter.patch(
  "/:id/status",
  authenticateToken(),
  validateSchema(updateOrderStatusSchema),
  updateOrderStatus
);

orderRouter.get("/:id", authenticateToken(), getOrderDetails);

orderRouter.patch(
  "/:id",
  authenticateToken(),
  validateSchema(updateOrderSchema),
  updateOrder
);

orderRouter.delete("/:id", authenticateToken(), deleteOrder);

export default orderRouter;
