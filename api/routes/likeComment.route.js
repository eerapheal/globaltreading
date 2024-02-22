import express from "express";
import { likeComment } from "../controllers/likeComment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.put("/likeComment/:commentId", verifyToken, likeComment);
export default router;
