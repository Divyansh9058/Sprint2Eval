const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,require:true},
    password:{type:String,required:true},
    role:{type:String,dafault:"customer",enum:["seller","customer"],required:true}
})

const usermodel = mongoose.model("user",userSchema);

module.exports = {usermodel}