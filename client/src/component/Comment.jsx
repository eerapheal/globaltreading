import { Alert, Button, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Comment = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment.length > 210) {
      setCommentError("Comment must be 250 characters or less.");
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
        setCommentError(null)
        setSuccessMessage("Comment submitted successfully!");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (error) {
      setCommentError(error.message);
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
            maxLength="250"
            onChange={(e) => setComment(e.target.value)}
          />
          <div className=" flex justify-between items-center">
            <p className="text-semibold text-red-500">
              {210 - comment.length} characters left{" "}
            </p>
            <Button gradientDuoTone="purpleToBlue" outline type="submit">
              Send
            </Button>
          </div> {
            commentError &&
          <Alert color="failure" className="mt-5">{commentError}</Alert>
          }
           {successMessage && <Alert className="mt-5" color="success">{successMessage}</Alert>}
        </form>
      )}
    </div>
  );
};

export default Comment;
