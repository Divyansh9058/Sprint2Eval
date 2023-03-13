const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    token:{type:String,required:true},
})

const blacklistmodel = mongoose.model("blacklist",productSchema);

module.exports = {blacklistmodel}