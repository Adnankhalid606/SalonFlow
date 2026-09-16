import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "../routes/userRoutes.js";
import employeeRoutes from "../routes/employeeRoutes.js";
import servicesRouters from "../routes/servicesRoutes.js";
import errorMiddleware from "../middleware/errorMiddlerware.js";
import transactionRoutes from "../routes/transactionRoutes.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/services", servicesRouters);
app.use("/api/transation", transactionRoutes);

app.use(errorMiddleware);

export default app;
