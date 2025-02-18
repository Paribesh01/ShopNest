import express from "express";
import cors from "cors";
import router from "./route";
import { config } from "dotenv";

const app = express();

config();

// app.use(cors());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", router);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
