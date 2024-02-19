import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp, FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { Textarea, Button } from "flowbite-react";

const CommentCard = ({ comment, onLike, onEdit }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [upDating, setUpDating] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    };
    getUser();
  }, [comment]);

  const updateComment = async () => {
    setUpDating(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment//updateComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setUpDating(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className=" p-1">
      <div className="flex items-center gap-2">
        <div>
          <img
            className="w-7 m-1 h-7 rounded-full bg-sky-400"
            src={user.profilePicture}
            alt={user.username}
          />
        </div>
        <div>
          <span className="font-semibold">
            {user ? `${user.username}` : "anonymous user"}
          </span>
        </div>
        <span>{moment(comment.createdAt).fromNow()}</span>
      </div>
      {upDating ? (
        <>
          <Textarea
            className="w-full p-1 text-gray-700 bg-gray-200 focus:bg-gray-50"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex items-center font-bold justify-between text-xs mr-2 ml-2 p-1">
            <Button
              className=""
              outline
              gradientDuoTone="purpleToBlue"
              onClick={() => setUpDating(false)}
            >
              Cancel
            </Button>
            <Button
              className=""
              outline
              gradientDuoTone="purpleToBlue"
              onClick={handleSave}
            >
              Send
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="">{comment.content}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs gap-1 p-1">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-400 ${
                  currentUser && comment.likes.includes(currentUser._id)
                    ? "text-blue-600"
                    : ""
                }`}
              >
                <FaThumbsUp />
              </button>
              <p>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
            </div>
            <div className="flex items-center text-s gap-1 p-1">
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <button
                    type="button"
                    className="text-blue-600 hover:text-green-700"
                    onClick={updateComment}
                  >
                    <FaRegEdit />
                  </button>
                )}

              {currentUser &&
                (currentUser.id === comment.userId || currentUser.isAdmin) && (
                  <button
                    type="button"
                    className="text-red-400 hover:text-red-700"
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentCard;
