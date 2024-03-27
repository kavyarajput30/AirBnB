const express = require("express");
const app = express();
const session = require("express-session");
const flash = require('connect-flash');
app.use(express.static("public"));
const mongoose = require("mongoose");
const path = require("path");

let ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const Listing = require("./models/listening.js");

const Reviews = require("./models/review.js");

const { listingSchema, reviewSchema } = require("./schema.js");

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

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details
      .map((el) => {
        el.message;
      })
      .join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details
      .map((el) => {
        el.message;
      })
      .join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//index route where all the listings are present
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    let result = await Listing.find({});
    //   res.send(result);
    res.render("./listings/index.ejs", { result });
  })
);

//get on the  add new listing form new route
app.get("/listings/newPlace", (req, res) => {
  res.render("./listings/newform.ejs");
});

//add new listing form submit
app.post(
  "/listing",
  validateListing,
  wrapAsync(async (req, res, next) => {
    // let { title, description, price, location, country, image } = req.body;
    let listing = req.body.listing;
    // console.log(listing);
    const list1 = new Listing(listing);
    await list1.save();
    res.redirect("/listings");
  })
);

//edit form route where we can edit a particular listing
app.get(
  "/listings/:id/edit",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let a = await Listing.findById(`${id}`);
    if(!a){
        throw new ExpressError('Listing not found', 404);
    }
    res.render("./listings/editform.ejs", { a });
  })
);

//delete route
app.get(
  "/listings/:id/delete",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id)
      .then(() => {
        console.log("success fully deleted");
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect("/listings");
  })
);

//show route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let a = await Listing.findById(`${id}`).populate("reviews");
    res.render("./listings/show.ejs", { a });
  })
);

//edit the listing in  form confrim button route
app.post(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = req.body.listing;

    await Listing.updateOne({ _id: id }, listing).then(() => {
      console.log("succsessfully updated");
    });
    res.redirect("/listings");
  })
);
//add review route
//post route
app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Reviews(req.body.reviews);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
  })
);

//delete route of review
app.post(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Reviews.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err });
});
