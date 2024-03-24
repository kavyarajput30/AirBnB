
const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listening.js");  // Corrected the file name



main().then((res)=>{ console.log("connection successful with db")}).catch(err=>{console.log(err)});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/majorproject");
   
}

const initDB =async ()=>{

    try {
        await Listing.insertMany(initdata.data);
        console.log("Data inserted");
      } catch (error) {
        console.error("Error inserting data:", error.message);
      }
}

initDB();