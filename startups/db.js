const mongoose = require("mongoose");

module.exports = function(){
    mongoose.connect("mongodb://localhost/hotel_booking")
    .then(() => console.log("connecting to mongoDB"))
    .catch(err => console.log("could not connect to mongoDB"))
}
