import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import appointmentRoutes from "./routes/appointmentRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(appointmentRoutes);

export default app;
