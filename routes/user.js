const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { logout, getLoginForm, getSignUpForm, login, signUp } = require("../controllers/user.js");

router.get("/signup",getSignUpForm);

router.post(
  "/signup",
  signUp
);

router.get("/login",getLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
   
  }),
login
);

router.get("/logout", logout);

module.exports = router;
