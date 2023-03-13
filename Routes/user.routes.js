const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userRouter = express.Router();
const {usermodel} = require("../Models/user.model");
const fs = require("fs")
const app = express();
app.use(express.json());

userRouter.get("/",(req,res)=>{
    res.send({msg:"Default Route"})
})


userRouter.post("/signup",async(req,res)=>{

    const {name,email,password,role} = req.body;
    try{

        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(400).send({msg:"Try Again",error:err.message})
            }else{
                const User = new usermodel({name,email,password:hash,role})
                await User.save();
                res.status(200).send({msg:"Signup Successfully"})
            }
        })
    }
    catch(error){
        res.status(500).send({msg:"Something Wrong try again",error:error.message})
    }
});


userRouter.post("/login",async (req,res)=>{

    try{
        const {email,password} = req.body;

        const isUser = await usermodel.findOne({email});
        if(!isUser){
           return res.status(400).send({msg:"SignUp Please then login"})
        }

        const isPassword = await bcrypt.compareSync(password,isUser.password)
        if(!isPassword){
            return res.status(400).send({msg:"Worng Password"})
        }

        const token = await jwt.sign({email,userID:isUser._id,role:isUser.role},process.env.token_key,{expiresIn:"3h"})

        const ref_token = await jwt.sign({email,userID:isUser._id},process.env.ref_token_key,{expiresIn:"3h"})

        res.status(200).send({msg:"Login Successfull",token,ref_token})
    }
    catch(err){
        res.status(500).send(err.message)
    }



})


userRouter.get("/logout",async (req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    try{

        const blacklist = JSON.parse(fs.readFileSync("./blacklist.json","utf-8"));

        blacklist.push(token)

        fs.writeFileSync("./blacklist.json",JSON.stringify(blacklist));

        res.status(200).send({msg:"Logout SuccessFully"});

    }catch(err){
        res.status(500).send({msg:"Something Wrong",error:err.message})
    }
})





module.exports = {userRouter}