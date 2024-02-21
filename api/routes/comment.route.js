import express from "express";
import {
  comment,
  getPostComment,
  updateComment,
  deleteComment,
  getComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/comment", verifyToken, comment);
router.get("/getComment", verifyToken, getComment);
router.get("/getPostComment/:postId", getPostComment);
router.put("/updateComment/:commentId", verifyToken, updateComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);

export default router;
