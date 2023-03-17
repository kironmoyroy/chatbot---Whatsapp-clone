const { Schema, model } = require("mongoose");


const userSchema = new Schema({
    name:{type:String,require},
    email:{type:String,unique:true, require},
    password:{type:String,require},
    isOnline:{type:String,default:"0"},
})


module.exports = model("User",userSchema)