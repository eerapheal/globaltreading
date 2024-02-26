import { Button, Navbar, Avatar, TextInput, Dropdown } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";
import { signOutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        dispatch(signOutSuccess("User's profile deleted successfully"));
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-norap 
text-sm sm:text-xl font-bold dark:text-white"
      >
        <div className="px-1 py-1 flex items-center">
          <img
            className="w-40px] h-[40px]"
            src="/images/GT.png"
            alt="Global Treadings Logo"
          />
          <span className="px-1 py-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 rounded-lg text-white">
            Global Treadings
          </span>
        </div>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className=" w-12 h-10 hidden" color="gray" pill>
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
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Signout</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/login">
               <Button className="bg-gradient-to-r text-center from-indigo-600
            via-purple-500 to-blue-500 border rounded-2xl ">SignIn</Button>
          </Link>
        )}
        <Navbar.Toggle />
        <Button
          className=" w-12 h-10 hidden sm:flex"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
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
        <Navbar.Link active={path === "/categories"} as={"div"}>
          <Link to="/search?searchTerm">Categories</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
