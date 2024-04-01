const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listening.js");

module.exports.getAllListing = wrapAsync(async (req, res) => {
  let result = await Listing.find({}).populate("owner");
  // console.log(result);
  //   res.send(result);
  res.render("./listings/index.ejs", { result });
});
module.exports.getParticularlisting = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let a = await Listing.findById(`${id}`)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  console.log(a.reviews[0]);
  if (!a) {
    req.flash("error", "Listing not found");
    res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { a });
});

module.exports.getNewListingForm = (req, res) => {
  res.render("listings/newform.ejs");
};

module.exports.addNewListing = wrapAsync(async (req, res, next) => {
  // let { title, description, price, location, country, image } = req.body;
  let listing = req.body.listing;
  if (!listing) {
    throw new ExpressError("All fields are required", 400);
  }
  // console.log(listing);
  const list1 = new Listing(listing);
  list1.owner = res.locals.currentUser._id;
  await list1.save();
  req.flash("success", "New Listing Created Successfully");
  res.redirect("/listings");
});

module.exports.getEditForm = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let a = await Listing.findById(`${id}`);
  if (!a) {
    req.flash("error", "Listing not found");
    res.redirect("/listings");
  }
  res.render("./listings/editform.ejs", { a });
});

module.exports.editListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = req.body.listing;
  //  console.log( "Request user" + req.user );
  await Listing.updateOne({ _id: id }, listing)
    .then(() => {
      console.log("succsessfully updated");
    })
    .catch((err) => {
      throw new ExpressError(err, 400);
    });
  req.flash("success", "Listing Updated Successfully");
  res.redirect(`/listings/${id}`);
});

module.exports.deleteListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id)
    .then(() => {
      console.log("success fully deleted");
    })
    .catch((err) => {
      console.log(err);
    });
  req.flash("success", "Listing Deleted Successfully");
  res.redirect("/listings");
});
