const express = require('express');
const router = express.Router();
const {Hotel, validateHotel} = require("../models/hotel");
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get('/', async(req, res) => {
  const hotel = await Hotel.find()
  .select({name : 1, emailId : 1, phoneNo : 1, Address : 1})
  res.send(hotel);
});

router.post('/' ,auth, async (req, res) => {
  const {error} = validateHotel(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const hotel = new Hotel(
    _.pick(req.body , ['name', 'emailId', 'phoneNo', 'Address', 'Rating', 'no_of_rooms_available', 'hotel_balance' , 'cost_per_night'])
  );
  await hotel.save();
  res.send(hotel);
});

router.get("/:id" , async (req, res)=> {
  const hotel = await Hotel.findById(req.params.id);
  if(!hotel) return res.status(400).send("Bad request");
  res.send(hotel);
});

router.put("/:id" ,[auth,admin] , async (req,res) => {
  const hotel = await Hotel.findById(req.params.id);
  if(!hotel) return res.status(400).send("Bad request");

  _.pick(req.body , ['name', 'emailId', 'phoneNo', 'Address', 'Rating']);

  await hotel.save();
  res.send(hotel);

});

router.delete("/:id" ,[auth,admin], async (req, res) => {
  const hotel = await Hotel.findByIdAndRemove(req.body.id);
  res.send(hotel);
})

module.exports = router;
