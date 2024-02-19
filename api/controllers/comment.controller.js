import errorHandler from "../utils/error.js";
import Comment from "../models/Comment.js";

export const comment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (!postId) {
      return next(errorHandler(400, "postId is required."));
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

export const getPostComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(404, "You are not allowed to edit this comment")
      );
    }
    const updateComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { nee: true }
    );
    res.status(200).json(updateComment);
  } catch (error) {
    next(error);
  }
};
