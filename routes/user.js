const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { PrismaClient } = require("../generated/prisma");
const { saveReturnTo } = require("../middleware");

const prisma = new PrismaClient();

const userscontroller = require("../controllers/users");

// SHOW SIGNUP FORM
router.get("/signup", userscontroller.signup);

// HANDLE SIGNUP
router.post("/signup", userscontroller.handlesignup);

// SHOW LOGIN FORM
router.get("/login", userscontroller.loginform);


// HANDLE LOGIN
router.post(
  "/login",
  saveReturnTo,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userscontroller.loginhandle);


// LOGOUT
router.get("/logout", userscontroller.logout);

module.exports = router;
