import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import Project from "./Pages/Project";
import Header from "./component/Header";
import Footers from "./component/Footer";
import PrivateRoute from "./component/PrivateRoute";
import AdminPrivateRoute from "./component/AdminPrivateRoute";
import CreatePost from "./Pages/CreatePost";
import UpdatePost from "./Pages/UpdatePost";
import PostPage from "./Pages/PostPage";
import ScrollTop from "./component/ScrollTop";
import Search from "./pages/Search";
import Home from "./Pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/post/:postSlug" element={<PostPage />} />
        <Route path="/categories" element={<Project />} />
      </Routes>
      <Footers />
    </BrowserRouter>
  );
}
