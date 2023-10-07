const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
});
const collection = mongoose.model("admins", adminSchema);
module.exports = collection;