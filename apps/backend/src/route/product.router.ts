import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByStore,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller";
import { authenticateToken } from "../middleware/auth";
import { validateSchema } from "../middleware/validateData";
import { productSchema } from "../schema/product";

const productRouter = express.Router();

productRouter.post(
  "/:storeId",
  // authenticateToken(),
  validateSchema(productSchema),
  createProduct
);

productRouter.get("/", authenticateToken(), getAllProducts);

productRouter.get("/:id", getProductById);

productRouter.get("/stores/:storeName", getProductsByStore);

productRouter.put(
  "/:id",
  // authenticateToken(),
  validateSchema(productSchema),
  updateProduct
);

productRouter.delete(
  "/:id",
  //  authenticateToken(),
  deleteProduct
);

export default productRouter;
