const mongoose = require("mongoose");
const Joi = require("joi")

const hotelSchema = new mongoose.Schema({
  name : {type : String , required : true},
  emailId : {type:String , required : true},
  phoneNo : {type:Number,
     required : true
   },
   Address : String,
   Rating : String,
   no_of_rooms_available : Number,
   hotel_balance : Number,
   cost_per_night: Number
});


function validateHotel(hotel){
  const schema = {
    name : Joi.string().required(),
    emailId : Joi.string().required(),
    phoneNo: Joi.number().required(),
    Address : Joi.string().required(),
    Rating : Joi.string().required(),
    no_of_rooms_available : Joi.number().required(),
    hotel_balance : Joi.number().required(),
    cost_per_night : Joi.number().required()
  }
  return Joi.validate(hotel , schema);
}

const Hotel = mongoose.model('Hotel' , hotelSchema);

exports.Hotel = Hotel;
exports.validateHotel = validateHotel;
exports.hotelSchema = hotelSchema;
