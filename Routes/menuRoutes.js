const express = require("express");
const menuModel = require("../models/menuModel");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.post("/", async (req, res) => {
  try {
    const data = req.body; // data comes from the body
    const newMenu = new menuModel(data);
    const savedMenu = await newMenu.save();
    res.status(200).json(savedMenu);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await menuModel.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router