import express from "express";
import { comment, getPostComment, updateComment, deleteComment} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/comment", verifyToken, comment);
router.get("/getPostComment/:postId", getPostComment);
router.put("/updateComment/:commentId", verifyToken, updateComment);
router.put("/deleteComment/:commentId", verifyToken, deleteComment);

export default router;
