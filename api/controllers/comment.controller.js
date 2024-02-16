import errorHandler from "../utils/error.js";
import Comment from "../models/Comment.js";

export const comment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (!postId) {
      return next(
        errorHandler(400, "postId is required.")
      );
    }

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed authorize login to continue")
      );
    }
    
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
