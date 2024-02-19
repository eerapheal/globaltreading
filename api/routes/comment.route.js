import express from "express";
import { comment, getPostComment, updateComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/comment", verifyToken, comment);
router.get("/getPostComment/:postId", getPostComment);
router.put("/updateComment/:commentId", verifyToken, updateComment);

export default router;
