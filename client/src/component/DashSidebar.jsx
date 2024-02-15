import { Sidebar, Button } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess("User's profile deleted successfully"));
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Sidebar.Item
              active={tab === "posts"}
              icon={HiDocumentText}
              labelColor="dark"
              as="div"
            >
              <Link to="/dashboard?tab=posts">
                <Button
                  className="u-full"
                  type="submit"
                  gradientDuoTone="purpleToBlue"
                  outline
                >
                  Posts
                </Button>
              </Link>
            </Sidebar.Item>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            <Button
              className="u-full"
              type="submit"
              gradientDuoTone="purpleToBlue"
              outline
            >
              Sign Out
            </Button>
          </Sidebar.Item>
          {currentUser.isAdmin && (
            <Sidebar.Item
              as="div"
              icon={HiArrowSmRight}
              className="cursor-pointer"
            >
              <Link to="/create-post">
                <Button
                  className="u-full"
                  type="submit"
                  gradientDuoTone="purpleToBlue"
                  outline
                >
                  Create Post
                </Button>
              </Link>
            </Sidebar.Item>
          )}
          {currentUser.isAdmin && (
            <Sidebar.Item
              as="div"
              icon={HiOutlineUserGroup}
              className="cursor-pointer"
            >
              <Link to="/dashboard?tab=users">
                <Button
                  className="u-full"
                  type="button"
                  gradientDuoTone="purpleToBlue"
                  outline
                >
                  All Users
                </Button>
              </Link>
            </Sidebar.Item>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
