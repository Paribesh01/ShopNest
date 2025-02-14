import { Request, Response } from "express";
import { db as prisma } from "../db";

export const createStore = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) res.status(401).json({ error: "Unauthorized" });
    if (user.role !== "STORE_OWNER" && user.role !== "SUPER_ADMIN") {
      res.status(403).json({ error: "Access denied" });
      return;
    }
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: "Store name is required" });
      return;
    }
    const store = await prisma.store.create({
      data: {
        name,
        ownerId: user.id,
      },
    });

    res
      .status(201)
      .json({ message: "Store created successfully", data: store });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getAllStores = async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== "SUPER_ADMIN")
      res.status(403).json({ error: "Forbidden" });

    const stores = await prisma.store.findMany({
      include: { owner: true, members: true },
    });

    res.json({ data: stores });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getStoreById = async (req: Request, res: Response) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: req.params.storeId },
      include: { owner: true, members: true },
    });

    if (!store) res.status(404).json({ error: "Store not found" });
    if (store?.ownerId !== req.user?.id) {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    res.json({ data: store });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const updateStore = async (req: Request, res: Response) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: req.params.storeId },
    });

    if (!store) {
      res.status(404).json({ error: "Store not found" });
      return;
    }
    if (store?.ownerId !== req.user?.id) {
      res.status(403).json({ error: "Access denied" });
      return;
    }
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: "Store name is required" });
      return;
    }

    const updatedStore = await prisma.store.update({
      where: { id: req.params.storeId },
      data: { name },
    });

    res.json({ message: "Store updated", data: updatedStore });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const deleteStore = async (req: Request, res: Response) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: req.params.storeId },
    });

    if (!store) {
      res.status(404).json({ error: "Store not found" });
      return;
    }
    if (store?.ownerId !== req.user?.id) {
      res.status(403).json({ error: "Access denied" });
      return;
    }
    await prisma.store.delete({ where: { id: req.params.storeId } });

    res.json({ message: "Store deleted" });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
