import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.json({ message: "All field is requred" });
  }

  const newUser = new User({
    username,
    email,
    password,
  });
  try {
    await newUser.save();
    res.json("signup successful");
  } catch (error) {
    res.status().json({ message: error.message });
  }
};
