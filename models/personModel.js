const { uniq } = require("lodash");
const mongoose = require("mongoose");

//Schema creation
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waitor", "manager"],
    required: true,
  },
  mobile:{
    type:String,
    required:true},
  email:{
    type:String,
    required:true,
    unique:true
  },
  address: {
    type: String,
  },
  salary:{
    type:Number,
    required:true
  }
});


// Model creation
const PersonModel = new mongoose.model("PersonModel", personSchema);
module.exports = PersonModel