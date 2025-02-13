import express from "express";
import authRouter from "./auth.router";
import storeRouter from "./store.router";
import categoryRouter from "./category.router";
import productRouter from "./product.router";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/auth", authRouter);
router.use("/store", storeRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

export default router;
