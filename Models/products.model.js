const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title:{type:String,required:true},
    price:{type:String,require:true},
})

const productmodel = mongoose.model("product",productSchema);

module.exports = {productmodel}