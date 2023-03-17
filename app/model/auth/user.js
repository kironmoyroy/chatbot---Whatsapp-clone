const { Schema, model } = require("mongoose");


const userSchema = new Schema({
    name:{type:String,require},
    email:{type:String,unique:true, require},
    password:{type:String,require}
})


module.exports = model("User",userSchema)