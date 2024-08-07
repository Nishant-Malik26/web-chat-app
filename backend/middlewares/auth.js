const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  const token = req.cookies;
  console.log("🚀 ~ router.use ~ token:", token);
  next();
});

module.exports = auth = router;
