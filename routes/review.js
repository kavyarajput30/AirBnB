
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listening.js");
const Reviews = require("../models/review.js");
const { reviewSchema } = require("../schema.js");

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

  //post route
router.post(
    "/",
    validateReview,
    wrapAsync(async (req, res) => {
      let listing = await Listing.findById(req.params.id);
      let newReview = new Reviews(req.body.reviews);
      listing.reviews.push(newReview);
      await newReview.save();
      await listing.save();
      req.flash('success', 'Review Added Successfully');
      res.redirect(`/listings/${listing._id}`);
    })
  );
  
//delete route of review
  router.post(
    "/:reviewId",
    wrapAsync(async (req, res) => {
      let { id, reviewId } = req.params;
      await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await Reviews.findByIdAndDelete(reviewId);
      req.flash('success', 'Review Deleted Successfully');
      res.redirect(`/listings/${id}`);
    })
  );

  module.exports = router;