import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.rout.js";
import cookieParser from "cookie-parser";
dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database is connented");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// use json
app.use(express.json());

// cookies parser
app.use(cookieParser);

// Routes

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Localhost server connection

app.listen(3000, () => {
  console.log("Server is on 3000");
});
