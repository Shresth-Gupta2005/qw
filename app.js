const express = require("express");

const app = express();
const passport=require("./auth")
const db = require("./connecting_to_mongoDB");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv").config();

app.use(passport.initialize());

//middleware function
const logReq = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`
  );
  next();
};
app.use(logReq);
const localAuthMiddleware=passport.authenticate("local",{session:false});
app.get("/",localAuthMiddleware, (req, res) => {
  res.send("Hello World!");
});

const personRoutes = require("./Routes/personRoutes");
const menuRoutes = require("./Routes/menuRoutes");

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:3000");
});
