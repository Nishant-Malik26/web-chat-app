const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req?.body?.email });

  if (!user) {
    return res
      .status(404)
      .json({ error: "User do not exist. Please signup to continue" });
  }
  try {
    const { password } = req?.body;

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    if (isPasswordCorrect) {
      const payload = {
        id: user?._id.toString(),
        name: user.name,
        email: user.email,
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
              maxAge: 1000 * 60 * 30, // would expire after 15 minutes
              httpOnly: true, // The cookie only accessible by the web server
            };

            return res.status(201).cookie("token", token, options).json({
              message: "User is successfully signed in",
              token,
              email: user.email,
            });
          }
        }
      );
    } else {
      return res
        .status(200)
        .json({ error: "Either email or password is not correct" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  req.session = null;
  res.status(200).json({ message: "Successfully logged out" });
});

module.exports = router;
