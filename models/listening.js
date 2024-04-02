const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reviews = require('./review.js');

const listingSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        minlength:50,
        required: true
    },
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=60&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Reviews",


        },
    ],

    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category:{
        type: String,
        required: true,
        enum:["Beach","Arctic","Mountain","Boats","Farms","Caravan", "Camps", "Historical Landmark","Rooms", "Hostel", "Hotel",  "Resort",  "Villas", "Creative spaces", "Deserts", "Domes", "Gardens","Other"],
    }

})



listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Reviews.deleteMany({review:{ $in : listing.reviews}});
    }
  
})
const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;