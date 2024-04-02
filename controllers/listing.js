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
  let url = req.file.path;
  let filename = req.file.filename;
  console.log('url is ' + url );
  console.log('filename is ' + filename );
  // let { title, description, price, location, country, image } = req.body;
  let listing = req.body.listing;
  if (!listing) {
    throw new ExpressError("All fields are required", 400);
  }
  // console.log(listing);
  const list1 = new Listing(listing);
  list1.owner = res.locals.currentUser._id;
  list1.image = { url, filename };
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
let originalImage= a.image.url;
 originalImage = originalImage.replace('/upload','/upload/h_200,w_220');

  res.render("./listings/editform.ejs", { a , originalImage });
});

module.exports.editListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = req.body.listing;
  if(typeof req.file !== 'undefined') {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }
  await Listing.updateOne({ _id: id }, listing, { new: true })
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
