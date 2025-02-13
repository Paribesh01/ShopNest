import express from "express";
import cors from "cors";
import router from "./route";
import { configDotenv } from "dotenv";

const app = express();

configDotenv();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", router);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
