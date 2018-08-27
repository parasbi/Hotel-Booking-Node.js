const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const {userSchema} = require("./user");
const {hotelSchema} = require("./hotel");

const bookSchema = new mongoose.Schema({
  user : {
    type : new mongoose.Schema({
      name : String,
      emailId : String
    }),
    required : true
  },
  hotel : {
    type : new mongoose.Schema({
      name: String,
      emailId : String,
      Address : String,
      phoneNo : Number
    }),
    required : true
  },
  no_of_days : {type : Number, required : true}
});

const Book = mongoose.model("Book" , bookSchema);

function validateBook(book){
  const schema = {
    userId : Joi.objectId().required(),
    hotelId : Joi.objectId().required(),
    no_of_days : Joi.number().required()
  }
  return Joi.validate(book , schema);
}
exports.Book = Book;
exports.validateBook = validateBook;
