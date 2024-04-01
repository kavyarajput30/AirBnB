
const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");
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
  isLoggedIn,
  isAuthor,
  deleteReview
);

  //post review route

  module.exports = router;