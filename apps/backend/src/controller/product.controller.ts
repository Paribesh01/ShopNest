import { Request, Response } from "express";
import { db as prisma } from "../db";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    const { name, description, price, stock, imageUrl, categoryId } = req.body;

    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
      res.status(404).json({ message: "Store not found" });
      return;
    }

    // Temporary comment until authentication is added in frontend

    // if (req.user.role !== "SUPER_ADMIN" && req.user.id !== store?.ownerId) {
    //   res.status(403).json({ message: "Unauthorized" });
    //   return;
    // }

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

    res.status(201).json({ data: product });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json({ data: products });
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

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ data: product });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getProductByCategoryByStore = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("getProductByCategoryByStore");
    const { storeName, categoryName } = req.params;
    const store = await prisma.store.findUnique({
      where: { name: storeName },
    });
    if (!store) {
      res.status(404).json({ message: "Store not found" });
      console.log("store not found");
      return;
    }

    const category = await prisma.category.findUnique({
      where: { name: categoryName, storeId: store.id },
      include: { store: true },
    });

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      console.log("category not found");
      return;
    }

    const products = await prisma.product.findMany({
      where: { categoryId: category.id },
      include: { store: true },
    });

    res.json({ data: products });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getProductsByStore = async (req: Request, res: Response) => {
  try {
    console.log("getProductsByStore");
    const { storeName } = req.params;
    const store = await prisma.store.findUnique({
      where: { name: storeName },
    });
    if (!store) {
      res.status(404).json({ message: "Store not found" });
      console.log("store not found");
      return;
    }

    // Temporary comment
    const products = await prisma.product.findMany({
      where: { storeId: store.id },
    });
    console.log(products);
    res.json({ data: products });
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

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Temporary comment

    // if (
    //   req.user.role !== "SUPER_ADMIN" &&
    //   req.user.id !== product?.store.ownerId
    // ) {
    //   res.status(403).json({ message: "Unauthorized" });
    //   return;
    // }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price, stock, imageUrl, categoryId },
    });

    res.json({ data: updatedProduct });
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

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Temporary comment

    // if (
    //   req.user.role !== "SUPER_ADMIN" &&
    //   req.user.id !== product?.store.ownerId
    // ) {
    //   res.status(403).json({ message: "Unauthorized" });
    //   return;
    // }

    await prisma.product.delete({ where: { id } });

    res.json({ message: "Product deleted successfully" });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
