const express = require("express");
const { userSignup, userLogin } = require("../controller/user.controller");
const router = express.Router();

//signup a user
router.post("/signup", userSignup);

//login a user
router.post("/login", userLogin);

module.exports = router;
