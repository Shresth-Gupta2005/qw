const express = require("express");
const app = express();
const db = require("./db");


const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const personRoutes = require('./Routes/personRoutes');
const menuRoutes = require('./Routes/menuRoutes');

app.use('/person', personRoutes);
app.use("/menu",menuRoutes);

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
