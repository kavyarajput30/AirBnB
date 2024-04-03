
const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isAuthor,isLoggedInForReview } = require("../middleware.js");
const {AddReview, deleteReview} = require('../controllers/review.js');



router.post(
  "/",
  isLoggedIn,
  validateReview,
  AddReview
);

//delete route of review
router.post(
  "/:reviewId",
  isLoggedInForReview,
  isAuthor,
  deleteReview
);

  //post review route

  module.exports = router;