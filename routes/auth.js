const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const {User} = require("../models/user");
const bcrypt = require("bcrypt");

router.post('/', async (req, res) => {
  const {error} = validate(req.body)
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({emailId : req.body.emailId});
  if(!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password , user.password);
  if(!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.send(token);
});


function validate(req){
  const schema = {
    emailId : Joi.string().required().email(),
    password : Joi.string().required()
  }
  return Joi.validate(req , schema);
}


module.exports = router;
