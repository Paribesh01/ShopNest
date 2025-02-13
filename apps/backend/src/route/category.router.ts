import express from "express";
import { authenticateToken } from "../middleware/auth";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controller/category.controller";
import { validateSchema } from "../middleware/validateData";
import { categorySchema } from "../schema/category";

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  authenticateToken(),
  validateSchema(categorySchema),
  createCategory
);
categoryRouter.get("/", getCategories);
categoryRouter.put(
  "/:id",
  authenticateToken(),
  validateSchema(categorySchema),
  updateCategory
);
categoryRouter.delete("/:id", authenticateToken(), deleteCategory);

export default categoryRouter;
