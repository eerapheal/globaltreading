import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database is connented");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use("/api/user", userRoutes);

app.listen(3000, () => {
  console.log("Server is on 3000");
});
