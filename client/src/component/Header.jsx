import { Button, Navbar, Avatar, TextInput, Dropdown } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-norap 
text-sm sm:text-xl font-bold dark:text-white"
      >
        <span
          className="px-2 py-1 bg-gradient-to-r from-indigo-600
via-purple-500 to-orange-500 rounded-lg text-white"
        >
          Global Treadings
        </span>
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className=" w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block textsm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item>Signout</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button
              className="bg-gradient-to-r from-indigo-600
            via-purple-500 to-blue-500"
              outline
            >
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
        <Button className=" w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/project"} as={"div"}>
          <Link to="/categories">categories</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
