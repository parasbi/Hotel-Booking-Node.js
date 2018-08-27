const express = require("express");//returns a function
const app = express();
const config = require("config");


require("./startups/routes")(app);
require("./startups/db")();

if(!config.get('jwtPrivateKey')){
  return console.error("Fatal error: jwtPrivateKey is not defined")
  process.exit(1);
}

app.get('/' , (req, res) => {
  res.send("an online hotel booking app running on blockchain");
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on ${port}`));

module.exports = server;
