import { Request, Response } from "express";
import { db as prisma } from "../db";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      orderItems,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      notes,
    } = req.body;
    const { storeId } = req.params;

    if (!storeId) {
      res.status(400).json({ error: "storeId is required" });
      return; 
    }

    // Calculate total and create order with items
    let total = 0;
    const products = await prisma.product.findMany({
      where: {
        id: { in: orderItems.map((item: any) => item.productId) },
      },
    });

    // Calculate total and verify products exist
    for (const item of orderItems) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        res
        .status(400)
        .json({ error: `Product ${item.productId} not found` });
        return; 
      }
      total += Number(product.price) * item.quantity;
    }

    const order = await prisma.order.create({
      data: {
        storeId,
        total,
        orderItems: {
          create: orderItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: products.find((p) => p.id === item.productId)!.price,
          })),
        },
        details: {
          create: {
            customerName,
            email: customerEmail,
            phoneNumber: customerPhone,
            address: shippingAddress,
            city: "",
            state: "",
            postalCode: "",
            country: "",
          },
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        details: true,
      },
    });

    res
      .status(201)
      .json({ message: "Order created successfully", data: order });
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const getStoreOrders = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;

    if (req.user?.role === "STORE_OWNER") {
      const store = await prisma.store.findFirst({
        where: { id: storeId, ownerId: req.user.id },
      });
      if (!store){
        res.status(403).json({ error: "Access denied" });
        return;

      } 
    }

    const orders = await prisma.order.findMany({
      where: { storeId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        store: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return; 
    }

    // Check permissions
    if (
      req.user?.role === "STORE_OWNER" &&
      order.store.ownerId !== req.user.id
    ) {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { store: true },
    });

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return; 
    }

    if (
      req.user?.role === "STORE_OWNER" &&
      order.store.ownerId !== req.user.id
    ) {
      res.status(403).json({ error: "Access denied" });
      return; 
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    res
      .status(200)
      .json({ message: "Order updated successfully", data: updatedOrder });
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { store: true },
    });

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return; 
    }

    if (
      req.user?.role === "STORE_OWNER" &&
      order.store.ownerId !== req.user.id
    ) {
      res.status(403).json({ error: "Access denied" });
      return; 
    }

    // Delete order items first (if cascade delete is not set up)
    await prisma.orderItem.deleteMany({
      where: { orderId: id },
    });

    await prisma.order.delete({
      where: { id },
    });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { store: true },
    });

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return; 
    }

    if (
      req.user?.role === "STORE_OWNER" &&
      order.store.ownerId !== req.user.id
    ) {
      res.status(403).json({ error: "Access denied" });
      return; 
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    res
      .status(200)
      .json({ message: "Order updated successfully", data: updatedOrder });
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
