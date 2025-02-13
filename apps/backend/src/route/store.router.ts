import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { validateSchema } from "../middleware/validateData";
import { storeSchema } from "../schema/store";
import {
  createStore,
  deleteStore,
  getAllStores,
  getStoreById,
  updateStore,
} from "../controller/store.controller";

const storeRouter = Router();

storeRouter.post(
  "/create",
  authenticateToken(),
  validateSchema(storeSchema),
  createStore
);
storeRouter.get("/all", authenticateToken(), getAllStores);
storeRouter.get("/:storeId", authenticateToken(), getStoreById);
storeRouter.put(
  "/:storeId",
  authenticateToken(),
  validateSchema(storeSchema),
  updateStore
);
storeRouter.delete("/:storeId", authenticateToken(), deleteStore);

export default storeRouter;
