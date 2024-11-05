const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const personRoutes = require('./Routes/personRoutes');
const menuRoutes = require('./Routes/menuRoutes');

app.use('/person', personRoutes);
app.use("/menu",menuRoutes);

const PORT=process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:3000");
});
