const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config")

const userSchema = new mongoose.Schema({
  name : {type : String , required : true},
  emailId : {type : String , required : true , unique : true},
  password : {type : String , required : true},
  user_balance : Number,
  isAdmin : Boolean
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id : this._id} , config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model("User", userSchema);

function validateUser(user){
  const schema = {
    name : Joi.string().required(),
    emailId : Joi.string().required().email(),
    password : Joi.string().required(),
      user_balance : Joi.number().required()
  }
  return Joi.validate(user , schema);
}

exports.User = User;
exports.validateUser = validateUser;
