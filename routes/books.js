const express = require("express");
const router = express.Router();
const {Book, validateBook} = require("../models/book");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {Hotel} = require("../models/hotel");
const {User} = require("../models/user");
const Fawn = require("fawn");
const mongoose = require("mongoose");

Fawn.init(mongoose);

router.get("/" , [auth, admin] , async (req, res) => {
  const book = await Book.find();
  res.send(book);
})

router.post('/' , auth, async (req,res) => {
  const {error} = validateBook(req.body);
  if(error) return res.status(400).send("Bad request");

  const hotel = await Hotel.findById(req.body.hotelId);
  if(!hotel) return res.status(400).send("Bad request");

  if(hotel.no_of_rooms_available == 0) return res.status(400).send("No rooms available");

  const user = await User.findById(req.body.userId);
  if(!user) return res.status(400).send("Bad request");

  const price = hotel.cost_per_night * req.body.no_of_days;
  if(user.user_balance < price) return res.status(400).send("You don't have enough balance in your wallet");

  const book = new Book ({
    user : {
      _id : user._id,
      name : user.name,
      emailId : user.emailId
    },
    hotel : {
      _id : hotel._id,
      name : hotel.name,
      emailId : hotel.emailId,
      phoneNo : hotel.phoneNo,
      Address : hotel.Address
    },
    no_of_days : req.body.no_of_days
  });

  new Fawn.Task()
  .save('books', book)
  .update('hotels' , {_id : hotel._id} , {
    $inc : {no_of_rooms_available : -1,
      hotel_balance : price
    }
  })
  .update('users' , {_id : user._id} , {
    $inc : {user_balance : -price}
  })
  .run();
  res.send(book);
})

module.exports = router;
