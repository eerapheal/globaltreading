import express from "express";
import {comment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/comment", verifyToken, comment);

 export default router;