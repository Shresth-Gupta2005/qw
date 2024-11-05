const { uniq } = require("lodash");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
});
personSchema.pre("save", async function (next) {
  const person = this;

  //hash the password only if it has been modified (or is new)
  if(!person.isModified("password")) return next();
  try{
    //salt generation
    const salt = await bcrypt.genSalt(10);
    
    //hash poassword generation
    const hashedPassword=await bcrypt.hash(person.password,salt);
    person.password=hashedPassword
    next();
  }
  catch(error){
    return next(err);

  }
});

personSchema.methods.comparePassword = async function (pwd){
try {
  const isPasswordMatch=await bcrypt.compare(pwd,this.password);

  return isPasswordMatch;
} catch (error) {
  throw error;
}

} 

// Model creation
const PersonModel = new mongoose.model("PersonModel", personSchema);
module.exports = PersonModel