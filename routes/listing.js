const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listening.js");
const { listingSchema} = require("../schema.js");

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

//index route where all the listings are present
router.get(
    "/",
    wrapAsync(async (req, res) => {
      let result = await Listing.find({});
      //   res.send(result);
      res.render("./listings/index.ejs", { result });
    })
  );
  
  //get on the  add new listing form new route
router.get("/newPlace", (req, res) => {
    res.render("./listings/newform.ejs");
  });  

//add new listing form submit
router.post(
    "/",
    validateListing,
    wrapAsync(async (req, res, next) => {
      // let { title, description, price, location, country, image } = req.body;
      let listing = req.body.listing;
      if(!listing){
          throw new ExpressError('All fields are required', 400);
      }
      // console.log(listing);
      const list1 = new Listing(listing);
      await list1.save();
      req.flash('success', 'New Listing Created Successfully');
      res.redirect("/listings");
    })
  );
  
  //edit form route where we can edit a particular listing
  router.get(
    "/:id/edit",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let a = await Listing.findById(`${id}`);
      if(!a){
        req.flash('error', 'Listing not found');
        res.redirect("/listings");
      }
      res.render("./listings/editform.ejs", { a });
    })
  );
  
  //delete route
  router.get(
    "/:id/delete",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      await Listing.findByIdAndDelete(id)
        .then(() => {
          console.log("success fully deleted");
        })
        .catch((err) => {
          console.log(err);
        });
      req.flash('success', 'Listing Deleted Successfully');
      res.redirect("/listings");
    })
  );
  
  //show route
  router.get(
    "/:id",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let a = await Listing.findById(`${id}`).populate("reviews");
      if(!a){
        req.flash('error', 'Listing not found');
        res.redirect("/listings");
      }
      res.render("./listings/show.ejs", { a });
    })
  );
  
  //edit the listing in  form confrim button route
  router.post(
    "/:id",
    validateListing,
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let listing = req.body.listing;
  
      await Listing.updateOne({ _id: id }, listing).then(() => {
        console.log("succsessfully updated");
      });
      req.flash('success', 'Listing Updated Successfully');
      res.redirect(`/listings/${id}`);
    })
  );  


module.exports = router;  