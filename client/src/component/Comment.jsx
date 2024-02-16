import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Comment = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleSubmitComment = async (e) => {};

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
          className="flex flex-col gap-1  p-5 border border-blue-400 rounded-br-3xl rounded-bl-3xl"
        >
          <TextInput
            placeholder="Drop a comment...."
            rows="3"
            maxLength="250"
            onChange={(e) => setComment(e.target.value)}
          />
          <p>{210 - comment.length} characters left </p>
          <Button gradientDuoTone="purpleToBlue" outline type="submit">
            Send
          </Button>
        </form>
      )}
    </div>
  );
};

export default Comment;
