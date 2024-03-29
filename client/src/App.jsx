import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import Header from "./component/Header";
import Footers from "./component/Footer";
import PrivateRoute from "./component/PrivateRoute";
import AdminPrivateRoute from "./component/AdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/updatePost";
import PostPage from "./pages/PostPage";
import ScrollTop from "./component/ScrollTop";
import Search from "./pages/Search";
import Home from "./pages/Home";
import PolicyTerms from "./pages/PolicyTerms";

export default function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
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
          <Route path="/policy-terms" element={<PolicyTerms />} />
        </Routes>
        <Footers />
      </HelmetProvider>
    </BrowserRouter>
  );
}
