const hotels = require("../routes/hotels");
const express = require("express");
const countries = require("../routes/countries");
const users = require("../routes/users");
const auth = require("../routes/auth");
const book = require("../routes/books");

module.exports = function(app){
  app.use(express.json());
  app.use("/api/hotels", hotels);
  app.use("/api/countries" , countries);
  app.use("/api/users" , users);
  app.use("/api/auth" , auth);
  app.use("/api/books" , book);
}
