import { Request, Response } from "express";
import { db as prisma } from "../db";
import { string } from "zod";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { storeId } = req.params;

    if (!storeId) {
      res.status(400).json({ error: "storeId is required" });
    }

    if (req.user?.role === "STORE_OWNER") {
      const store = await prisma.store.findFirst({
        where: { id: storeId, ownerId: req.user.id },
      });
      if (!store) {
        res.status(403).json({ error: "Access denied" });
        return;
      }
    } else if (req.user?.role !== "SUPER_ADMIN") {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    const category = await prisma.category.create({
      data: { name, storeId: storeId as string },
    });

    res
      .status(201)
      .json({ message: "Category created successfully", data: category });
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: { storeId: req.params.storeId },
    });
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await prisma.category.findUnique({
      where: { id },
      include: { store: true },
    });
    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    if (
      req.user?.role === "STORE_OWNER" &&
      category?.store.ownerId !== req.user.id
    ) {
      res.status(403).json({ error: "Access denied" });
      return;
    } else if (req.user?.role !== "SUPER_ADMIN") {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });
    res
      .status(200)
      .json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: { store: true },
    });
    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    if (
      req.user?.role === "STORE_OWNER" &&
      category?.store.ownerId !== req.user.id
    ) {
      res.status(403).json({ error: "Access denied" });
      return;
    } else if (req.user?.role !== "SUPER_ADMIN") {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    await prisma.category.delete({ where: { id } });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
