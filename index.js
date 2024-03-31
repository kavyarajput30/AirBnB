const express = require("express");
const app = express();
const session = require("express-session");
const flash = require('connect-flash');
app.use(express.static("public"));
const mongoose = require("mongoose");
const path = require("path");
let ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
const ExpressError = require("./utils/ExpressError.js");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");


const listings = require('./routes/listing.js');
const review = require('./routes/review.js');
const user = require('./routes/user.js');

const sessionOptions = {
  secret: "mysuperSecretCode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(8080, () => {
  console.log("app is listening to port 8080");
});

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ express: true }));
app.use(express.json());

main()
  .then((res) => {
    console.log("connection successful with db");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/majorproject");
}
app.get("/", (req, res) => {
  res.send("Hii i am the root page");
});
app.use((req,res,next)=>{
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

app.use('/listings', listings);
app.use('/listings/:id/reviews', review);
app.use('/', user);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err });
});
