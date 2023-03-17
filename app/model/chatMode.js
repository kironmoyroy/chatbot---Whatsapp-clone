const { Schema, model } = require("mongoose");


const chatSchema = new Schema({
    sender_id:{type:String,require},
    receiveder_id:{type:String,require},
    massage:{type:String,require},
    time:{type:String,require},
    seen:{type:String,default:"0"},
})


module.exports = model("Chat",chatSchema)