import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getpost?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPost(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPost();
    }
  }, [currentUser._id]);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPost.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete Post</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit Post</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {userPost.map((post) => (
              <Table.Row
                key={post._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-900"
              >
                <Table.Cell>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell as="div">
                  <Link
                    to={`/post/${post.slug}`}
                    className="w-20 h-10 object-cover bg-gray-500"
                  >
                    <img className="w-20 h-10 object-cover" src={post.image} />
                  </Link>
                </Table.Cell>
                <Table.Cell as="div">
                  <Link className="hover:underline" to={`/post/${post.slug}`}>
                    {post.title}
                  </Link>
                </Table.Cell>

                <Table.Cell>{post.category}</Table.Cell>
                <Table.Cell as="div">
                  <Link to={`/update-post/${post._id}`}>
                    <span
                      className="hover:outline bg-gradient-to-r from-indigo-600
            via-purple-500 to-blue-500 p-3 rounded hover:underline text-white"
                    >
                      Update
                    </span>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    outline
                    className="bg-gradient-to-r from-indigo-600
            via-purple-500 to-blue-500 hover:underline text-red-600"
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>You have no posts</p>
      )}
    </div>
  );
};

export default DashPosts;
