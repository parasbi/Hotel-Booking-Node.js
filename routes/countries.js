const mongoose = require("mongoose");
const {validateCountry , Country} = require("../models/country");
const express = require("express");
const router = express.Router();
const {Hotel} = require("../models/hotel");
const _ = require("lodash");


router.get("/" , async(req, res) => {
  const country = await Country.find()
  .select({name : 1 , hotel : 1});
  res.send(country);
});

router.post("/" ,auth , async (req, res) => {
  const {error} = validateCountry(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const hotel = await Hotel.findById(req.body.hotelId);
  if(!hotel) return res.status(400).send("Bad request");

  if(hotel.Address != req.body.name) return res.status(400).send("This hotel doesn't belong to this place");

  const country = new Country({
    name : req.body.name,
    hotel : new Hotel({
      _id : hotel._id,
      name : hotel.name,
      emailId : hotel.emailId,
      phoneNo : hotel.phoneNo
    })
  });
    await country.save();
    res.send(country);
  });

  router.get("/:id" , async (req,res) => {
    const country = await Country.findById(req.params.id);
    if(!country) return res.status(400).send("Bad request");

    res.send(country);
  })
  router.put("/:id" ,[auth, admin], async(req,res)=> {
    const country = await Country.findById(req.params.id);
    if(!country) return res.status(400).send("Bad request");

    country.name = req.body.name
    res.send(country);
  });
  router.delete("/:id" ,[auth, admin], async (req, res) => {
    const country = await Country.findByIdAndRemove(req.params.id);
    res.send(country);
  });



module.exports = router;
