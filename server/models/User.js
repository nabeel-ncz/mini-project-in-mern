const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    profile:{
        type:String,
    }
});
const collection = mongoose.model("users",userSchema);
module.exports = collection;