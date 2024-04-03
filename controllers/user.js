const wrapAsync = require("../utils/wrapAsync.js");
const User = require('../models/user.js');
module.exports.getSignUpForm =  (req, res) => {
    res.render("./users/signup.ejs");
  }
module.exports.signUp = wrapAsync(async (req, res) => {
    try {
      let { email, username, password } = req.body;
      const newUser = new User({ email, username });
      const registerUser = await User.register(newUser, password);
      if(!registerUser){
        throw new Error('Something went wrong');
      }

      req.login(registerUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "User Logged In successfully");
        res.redirect("/listings");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  })  

  module.exports.getLoginForm =  (req, res) => {
    res.render("./users/login.ejs");
  }

  module.exports.login =  async (req, res) => {
    req.flash("success", "Welcome to our website you successfullly logged in");
    res.redirect( res.locals.redirectURL || "/listings");
  }

  module.exports.logout = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are logged out");
      res.redirect("/listings");
    });
  }