
const express = require("express");

const  bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

// SIGNUP
router.post("/signup", async(req, res)=> {

    try{

        const {name, email, password} = req.body;

        // Existing User Check
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User already exists!"});
        };
        // Password Hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save User
         const user = new User({
            name,
            email,
            password:hashedPassword});

        await user.save();

        // response
        res.status(201).json({message: "User Registered Succesfully"});
    } catch(error) {
        console.log(error);
        res.status(500).json({message:error.message});

    }

});

router.post("/login", async(req, res)=>
{
   try { 
    const { email , password } =req.body;
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message: "User not registered"})
    };

    const isMatch = await bcrypt.compare(password, user.password);
       
    if(!isMatch){
       return res.status(400).json({message:"Credentials Invalid"})
    }
    
    // create token
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:"1d"});


    res.status(200).json({message: "Login Successful", token})

} catch(error){
    console.log(error);
    res.status(500).json({message: error.message});

}
})

module.exports = router ;


