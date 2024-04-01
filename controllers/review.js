const Listing = require("../models/listening.js");
const Reviews = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
module.exports.AddReview =  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Reviews(req.body.reviews);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash('success', 'Review Added Successfully');
    res.redirect(`/listings/${listing._id}`);
  });


  module.exports.deleteReview =   wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Reviews.findByIdAndDelete(reviewId);
    req.flash('success', 'Review Deleted Successfully');
    res.redirect(`/listings/${id}`);
  })

