const Listing = require('./models/listening.js')
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Reviews = require('./models/review.js');

module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
      // redirect url
      req.session.redirectURL = req.originalUrl;
        req.flash('error', 'Please Login First');
      return res.redirect('/login');
      }
    next();  
}

module.exports.saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectURL){
    res.locals.redirectURL = req.session.redirectURL;

  }
  next();
}


module.exports.isOwner = async (req, res,next)=>{
let {id} = req.params;
let list = await Listing.findById(id);
if (!list.owner.equals(res.locals.currentUser._id)) {
  console.log("You are not authorized to perform this action");
  req.flash("error", "You are not authorized to perform this action");
  return res.redirect(`/listings/${id}`);
}
next();
}

module.exports.validateListing = (req, res, next) => {
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



module.exports.validateReview = (req, res, next) => {
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


module.exports.isAuthor = async (req, res,next)=>{
  let {reviewId,id} = req.params;
  let review = await Reviews.findById(reviewId);
  if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are not authorized to perform this action");
    return res.redirect(`/listings/${id}`);
  }
  next();
  }