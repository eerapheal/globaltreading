import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignOut = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
    } catch (error) {}
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
              <Label value=" Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
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
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button type="submit" gradientDuoTone="purpleToBlue" outline>
              Sign Up
            </Button>
          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
