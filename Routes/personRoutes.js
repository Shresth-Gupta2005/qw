const express = require("express");
const personModel = require("../models/personModel");
const router = express.Router();
const bodyParser = require("body-parser");
const { runInContext } = require("lodash");
router.use(bodyParser.json());
const {jwtAuthMidddleware,generateToken} = require("../jwt")
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // data comes from the body
    
    //create a new person using the mongoose model.
    const newPerson = new personModel(data);

    const savedPerson = await newPerson.save();
    
    const payload={
      id:savedPerson._id,
      username:savedPerson.username

    }
    const token=generateToken(payload);
    
    res.status(200).json({savedPerson:savedPerson,token:token});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//login
router.post('/login',async(req,res)=>{
  try {
    const {username,password}=req.body;
    const user =await personModel.findOne({username:username});

    if(!user){
      return res.status(404).json({message:"user not found"});
    }
    const isPasswordMatch=await user.comparePassword(password);
    if(!isPasswordMatch){
      return res.status(401).json({message:"Incorrect password"});
    }
    //generate token
    const payload={
      id:user._id,
      username:user.username
    }
    const token=generateToken(payload);
    res.status(200).json({user:user,token:token});

  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal error occured"});
  }
})

//profile route
router.get('/profile',jwtAuthMidddleware,async(req,res)=>{
  try {
    const userData=req.user; 
    const userid=userData.id;
    const user=await personModel.findById(userid);
    res.status(200).json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal error occured"});
  }})
router.get("/",jwtAuthMidddleware, async (req, res) => {
  try {
    const data = await personModel.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//parametrized api call to get person by workType.
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;

    if (workType == "chef" || workType == "waitor" || workType == "manager") {
      const response = await personModel.find({ work: workType });
      console.log(response);
      res.status(200).json(response);
    } else {
      res.status(404).json("data not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await personModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json("data not found");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await personModel.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json("data not found");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
