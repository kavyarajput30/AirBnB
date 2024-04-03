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
  selectedListing,
  searchedListing,
} = require("../controllers/listing.js");

const multer = require("multer");
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });
//index route where all the listings are present
router.route('/')
.get(getAllListing)
.post( isLoggedIn, upload.single("listing[image]"),validateListing,addNewListing);

router.post('/search', searchedListing);
//get on the  add new listing form new route
router.get("/newPlace", isLoggedIn, getNewListingForm);

// get selected listing
router.get('/selected', selectedListing);

router.route("/:id")
.get( getParticularlisting)
.post( isLoggedIn, isOwner, upload.single("listing[image]"),validateListing, editListing);

//edit form route where we can edit a particular listing
router.get("/:id/edit", isLoggedIn, isOwner, getEditForm);

//delete route
router.get("/:id/delete", isLoggedIn, isOwner, deleteListing);


module.exports = router;
