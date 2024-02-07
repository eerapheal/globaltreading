import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import Oauth from "../component/Oauth";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Kindly fill out all field"));
    }
    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (!res.ok) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure("An error occurred"));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 gap-5 max-w-5xl mx-auto flex-col md:flex-row">
        <div className=" flex-1">
          <Link to="/" className="font-bold dark:text-white">
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-600
via-purple-500 to-orange-500 rounded-lg text-white text-4xl"
            >
              Global Treadings
            </span>
          </Link>

          <p className="text-sm mt-5">
            Global Treadings: Your Passport to Worldwide Blogging. Join our
            community of writers and readers spanning the globe. Share your
            stories, explore diverse perspectives, and connect with like-minded
            individuals. Unleash your creativity and join the conversation on
            Global Treadings today!
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value=" Your email" />
              <TextInput
                type="email"
                placeholder="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value=" Your password" />
              <TextInput
                type="password"
                placeholder="*******"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              outline
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <Oauth />
          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span>Don't Have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
