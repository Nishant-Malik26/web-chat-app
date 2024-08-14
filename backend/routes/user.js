const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
router.post("/signup", async (req, res) => {
  const user = await User.findOne({ email: req?.body?.email });

  if (user) {
    return res.status(500).json({ error: "User already exists" });
  }
  try {
    const { name, email, password } = req?.body;

    const newUser = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    const id = await User.findOne({ email });
    const payload = {
      id: id?._id.toString(),
      name: id?.name,
      email: id?.email,
    };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) {
          throw Error("Server Crashed");
        } else {
          let options = {
            maxAge: 1000 * 60 * 30,
            httpOnly: true, // The cookie only accessible by the web server
          };

          return res.status(201).cookie("token", token, options).json({
            message: "User is succeefully signed in",
            token,
            email: user.email,
            userId: payload?.id,
          });
        }
      },
    );
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error);
    return res.status(500).json({ error });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    if (!users?.length) {
      return res.status(404).json({ error: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// router.get("users/:id", async (req, res) => {
//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ error: "No user found" });
//     }
//     return res.status(200).json({ ...user });
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// });

module.exports = router;
