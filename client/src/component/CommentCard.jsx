import { useEffect, useState } from "react";
import moment from "moment";

const CommentCard = ({ comment }) => {
  const [user, setUser] = useState({});
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
        <span>{moment(comment.createdAt).fromNow().slice(0, 9)}</span>
      </div>
      <p className="">{comment.content}</p>
    </div>
  );
};

export default CommentCard;
