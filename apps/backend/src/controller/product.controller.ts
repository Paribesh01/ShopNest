import { Request, Response } from "express";
import { db as prisma } from "../db";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    const { name, description, price, stock, imageUrl, categoryId } = req.body;

    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) res.status(404).json({ message: "Store not found" });

    if (req.user.role !== "SUPER_ADMIN" && req.user.id !== store?.ownerId) {
      res.status(403).json({ message: "Unauthorized" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        imageUrl,
        storeId: storeId as string,
        categoryId,
      },
    });

    res.status(201).json(product);
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getProductsByStore = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    const products = await prisma.product.findMany({ where: { storeId } });

    res.json(products);
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, imageUrl, categoryId } = req.body;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { store: true },
    });

    if (!product) res.status(404).json({ message: "Product not found" });

    if (
      req.user.role !== "SUPER_ADMIN" &&
      req.user.id !== product?.store.ownerId
    ) {
      res.status(403).json({ message: "Unauthorized" });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price, stock, imageUrl, categoryId },
    });

    res.json(updatedProduct);
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: { store: true },
    });

    if (!product) res.status(404).json({ message: "Product not found" });

    if (
      req.user.role !== "SUPER_ADMIN" &&
      req.user.id !== product?.store.ownerId
    ) {
      res.status(403).json({ message: "Unauthorized" });
    }

    await prisma.product.delete({ where: { id } });

    res.json({ message: "Product deleted successfully" });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
