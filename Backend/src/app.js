import express, { urlencoded } from "express";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: ["https://contact-management-system-three.vercel.app"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import userRoutes from "./routes/contact.route.js";
app.use("/api/v1/contact", userRoutes);

export { app };
