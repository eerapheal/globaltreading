import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.Error(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUser();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers/&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.Error(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.Error(data.message);
      } setUsers((prev) =>
      prev.filter((user) => user._id !== userIdToDelete)
    );
    } catch (error) {
      console.Error(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Created </Table.HeadCell>
              <Table.HeadCell>Profile Picture</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
              <Table.HeadCell>email</Table.HeadCell>
              <Table.HeadCell>Admin users</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.map((user) => (
                <Table.Row
                  key={user._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-900"
                >
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell as="div">
                    <img
                      className="w-10 rounded-full h-10 object-cover"
                      src={user.profilePicture}
                    />
                  </Table.Cell>
                  <Table.Cell as="div">{user.username}</Table.Cell>

                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin ? "Admin" : "User"}</Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
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
        <p>
          no User Account found. Get to work man fix this before we loss
          Publishers
        </p>
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
                Are you sure you want to delete this user?
              </h3>
            </div>
            <div className="flex justify-center gap-5">
              <Button color="failure"  onClick={handleDeleteUser}>Yes, i am sure</Button>
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

export default DashUsers;
