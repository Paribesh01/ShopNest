import express from "express";
import authRouter from "./auth.router";
import storeRouter from "./store.router";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/auth", authRouter);
router.use("/store", storeRouter);

export default router;
