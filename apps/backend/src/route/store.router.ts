import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { validateSchema } from "../middleware/validateData";
import { storeSchema } from "../schema/store";

const storeRouter = Router();

storeRouter.post("/create", authenticateToken(), validateSchema(storeSchema));
storeRouter.get("/all", authenticateToken());
storeRouter.get("/:storeId", authenticateToken());
storeRouter.put("/:storeId", authenticateToken(), validateSchema(storeSchema));
storeRouter.delete("/:storeId", authenticateToken());

export default storeRouter;
