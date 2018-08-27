const mongoose = require("mongoose");
const Joi = require("joi");//returns a class
const {hotelSchema} = require("./hotel");
Joi.objectId = require("joi-objectid")(Joi);

const countrySchema = new mongoose.Schema({
  name : String,
  hotel : {
    type : new mongoose.Schema({
      name : {type : String}
    })
  }
});
const Country = mongoose.model("Country" ,countrySchema );

function validateCountry(country) {
  const schema = {
  name:Joi.string().required(),
  hotelId:Joi.objectId().required()
}

return Joi.validate(country , schema);
};
exports.Country = Country;
exports.validateCountry = validateCountry;
