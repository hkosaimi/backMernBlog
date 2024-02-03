const mongoose = require("mongoose");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

//signup user
const userSignup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    if (!email || !firstname || !lastname || !email || !password) {
      throw new Error("All fields are required");
    }
    const exists = await User.findOne({ email });
    if (exists) {
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const signup = await User.create({
      firstname,
      lastname,
      email,
      password: hash,
    });
    const token = createToken(signup._id);
    res.json({ success: "Successfully signed up", email, token, role: signup.role });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user._id);

      res.json({
        success: "Successfully logged in",
        firstname: user.firstname,
        token,
        role: user.role,
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { userSignup, userLogin };
