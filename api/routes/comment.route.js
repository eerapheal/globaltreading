import express from "express";
import { comment, getPostComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/comment", verifyToken, comment);
router.get("/getPostComment/:postId", getPostComment);

export default router;
