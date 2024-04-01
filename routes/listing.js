const express = require("express");
const router = express.Router();

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {
  getAllListing,
  getParticularlisting,
  getNewListingForm,
  addNewListing,
  getEditForm,
  editListing,
  deleteListing,
} = require("../controllers/listing.js");

//index route where all the listings are present
router.get("/", getAllListing);
//get on the  add new listing form new route
router.get("/newPlace", isLoggedIn, getNewListingForm);
//show route
router.get("/:id", getParticularlisting);

//add new listing form submit
router.post("/",isLoggedIn, validateListing, addNewListing);

//edit form route where we can edit a particular listing
router.get("/:id/edit", isLoggedIn, isOwner, getEditForm);

//edit the listing in  form confrim button route
router.post("/:id", isLoggedIn, isOwner, validateListing, editListing);

//delete route
router.get("/:id/delete", isLoggedIn, isOwner, deleteListing);

module.exports = router;
