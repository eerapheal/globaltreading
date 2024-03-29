import { Alert, Button, TextInput, Modal } from "flowbite-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CommentCard from "./CommentCard";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Comment = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment.length > 210) {
      setCommentError("Comment must be 210 characters or less.");
      return;
    }
    try {
      const res = await fetch("/api/comment/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setSuccessMessage("Comment submitted successfully!");
        setComments([data, ...comments]);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComment/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLikes = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      const res = await fetch(`/api/likeComment/likeComment/${commentId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };
  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("./login");
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();

        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5">
          <img
            className="h-6 w-6 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt="pro-pic"
          />
          <Link to={"/dashboard?tab=profile"}>@{currentUser.username}</Link>
        </div>
      ) : (
        <div className="flex items-center gap-3 text-semibold">
          <span>Sign in to Comment</span>
          <Link className="hover:underline text-blue-700" to="/login">
            Click to Login
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmitComment}
          className="flex flex-col gap-2  p-5 border border-blue-400 rounded-br-3xl rounded-bl-3xl"
        >
          <TextInput
            placeholder="Drop a comment...."
            rows="3"
            maxLength="210"
            onChange={(e) => setComment(e.target.value)}
          />
          <div className=" flex justify-between items-center">
            <p className="text-semibold text-red-500">
              {210 - comment.length} characters left{" "}
            </p>
            <Button gradientDuoTone="purpleToBlue" outline type="submit">
              Send
            </Button>
          </div>{" "}
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
          {successMessage && (
            <Alert className="mt-5" color="success">
              {successMessage}
            </Alert>
          )}
        </form>
      )}
      <div>
        {comments.length === 0 ? (
          <p>Leave a comment</p>
        ) : (
          <>
            <div className="flex gap-1 items-center mt-3">
              <p>Comments:</p>
              <div className=" items-center font-bold">
                <p>{comments.length}</p>
              </div>
            </div>

            <div style={{ wordWrap: "break-word" }}>
              {comments.map((comment) => (
                <CommentCard
                  key={comment._id}
                  comment={comment}
                  onLike={handleLikes}
                  onEdit={handleEdit}
                  onDelete={(commentId) => {
                    setShowModal(true);
                    setCommentToDelete(commentId);
                  }}
                />
              ))}
            </div>
          </>
        )}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header>
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="h-14 w-14 text-gray-500 dark:text-gray-200 mb-4 mx-auto" />
                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this comment?
                </h3>
              </div>
              <div className="flex justify-center gap-5">
                <Button
                  color="failure"
                  onClick={() => handleDelete(commentToDelete)}
                >
                  Yes, i am sure
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </Modal.Body>
          </Modal.Header>
        </Modal>
      </div>
    </div>
  );
};

export default Comment;
