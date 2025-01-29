import cors from "cors";
import express, { Application } from "express";

const app: Application = express();

// Apply middleware
app.use(cors());
app.use(express.json());

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
