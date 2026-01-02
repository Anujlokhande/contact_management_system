import express, { urlencoded } from "express";
import cors from "cors";
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import userRoutes from "./routes/contact.route.js";
app.use("/api/v1/contact", userRoutes);

export { app };
