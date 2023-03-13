const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userRouter = express.Router();
const {usermodel} = require("../Models/user.model");
const fs = require("fs")
const app = express();
app.use(express.json());


const authorise=(permittedrole)=>{
    return (req,res,next)=>{
        const userrole=req.user.role;
        if(permittedrole.includes(userrole)){
            next();
        }else{
            res.send({msg:"You are not unauthorised to do this"})
        }
    }
}

module.exports={
    authorise
}