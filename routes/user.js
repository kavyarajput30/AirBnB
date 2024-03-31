const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const { listingSchema } = require("../schema.js");
const passport = require("passport");
const localStrategy = require("passport-local");
router.get(
  "/signup",
  wrapAsync((req, res) => {
    res.render("users/signup.ejs");
  })
);

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try{
        let signup = req.body.signup;
        console.log(signup);
    
        const newUser = new User(signup);
        const registerUser = await User.register(newUser, signup.password);
        req.flash("success", "User created successfully");
        res.redirect("/listings");
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
   
  })
);

router.get('/login', wrapAsync( (req,res)=>{
    res.render('users/login.ejs')
}

))


router.post('/login',passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), wrapAsync( (req,res)=>{
   req.flash("success","Welcome to our website you successfullly logged in")
   res.redirect('/listings')
}

))


module.exports = router;
