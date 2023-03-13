const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const productRouter = express.Router();
const {productmodel} = require("../Models/products.model");
const fs = require("fs")
const app = express();
app.use(express.json());





productRouter.post("/addproducts",async(req,res)=>{

    try{
        const data = req.body;
        const newproduct = productmodel(data);

        await newproduct.save();
        res.status(200).send({msg:"Product Successfully Added"})

    }catch(err){
        res.status(500).send("Something wrong , Try Again")
    }

})


productRouter.get("/products",async(req,res)=>{

    try{
        const data = await productmodel.find();
        res.status(200).send({msg:"Products Data",data})
    }
    catch(err){
        res.status(500).send({msg:"Something Wrng TryAgain"})
    }

})


productRouter.delete("/deleteproducts",async(req,res)=>{
    
    try{
        const productid = req.params.id;
        await productmodel.findByIdAndDelete(productid);
        res.status(200).send({msg:"Data Delete Successfully"})
    }
    catch(err){
        res.status(500).send({msg:"Something Wrng TryAgain"})
    }

})



module.exports = {productRouter}