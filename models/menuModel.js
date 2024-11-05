const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum:["sweet",   "salty", "spicy", "bitter"],
    required:true
  },
  is_drink: {
    type: Boolean,
    default:false
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales:{
    type:Number,
    default:0
  }
});
const menuModel =new  mongoose.model("menuModel", menuSchema);
module.exports = menuModel;