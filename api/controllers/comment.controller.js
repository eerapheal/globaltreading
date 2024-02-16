import errorHandler from "../utils/error.js";
import Comment from "../models/Comment.js";

export const comment = async (req, res, next) => {
  try {
    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed authorize login to continue")
      );
    }
    
    const { content, postId, userId } = req.body;
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
