const express = require("express");
const app= express()
app.use(express.json());
require("dotenv").config()

const {connection} = require("./config/db")
const {userRouter} = require("./Routes/user.routes")
const {productRouter} = require("./Routes/products.routes")
const {authenticator} = require("./Middleware/Authentication")

app.use("/user",userRouter)
app.use(authenticator)
app.use("/item",productRouter)



app.listen(process.env.PORT,async ()=>{
    try{
        await connection;
        console.log("Connected to DB")
    }catch(error){
        console.log(error.message)
    }
})