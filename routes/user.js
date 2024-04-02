const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const {
  logout,
  getLoginForm,
  getSignUpForm,
  login,
  signUp,
} = require("../controllers/user.js");

router.route("/signup").get(getSignUpForm).post(signUp);

router
  .route("/login")
  .get(getLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    login
  );

router.get("/logout", logout);

module.exports = router;
