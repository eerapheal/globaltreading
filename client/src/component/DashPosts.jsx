import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getpost?userId=${currentUser._id}`);
        const data = await res.json("");
        if (res.ok) {
          setUserPost(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.Error(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPost();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPost.length;
    try {
      const res = await fetch(
        `/api/post/getpost?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.Error(error.message);
    }
  };
  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.Error(data.message);
      } else {
        setUserPost((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.Eroor(error.meggasse);
    }
  };
  
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPost.length > 0 ? (
        <>
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
                      <img
                        className="w-20 h-10 object-cover"
                        src={post.image}
                      />
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
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
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
          {showMore && (
            <div className="flex mt-3 items-center justify-center">
              <Button
                onClick={handleShowMore}
                className="bg-gradient-to-r from-indigo-600
            via-purple-500 to-blue-500 self-center text-semi-bold "
                outline
              >
                Show more
              </Button>
            </div>
          )}
        </>
      ) : (
        <p>You have no posts</p>
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
                Are you sure you want to delete this Post?
              </h3>
            </div>
            <div className="flex justify-center gap-5">
              <Button color="failure" onClick={handleDeletePost}>
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
  );
};

export default DashPosts;
