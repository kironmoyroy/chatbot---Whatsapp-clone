const User = require("../../model/auth/user")
const Chat = require("../../model/chatMode")


const chatController = () =>{
    return{
        async chat(req,res){
            const data = await User.find()
            res.render("dashboard/chat",{data})
        },
        saveChat(req,res){
            const {sender_id,receiveder_id,massage,time } = req.body
            if(!sender_id,!receiveder_id,!massage,!time){
               return res.status(400).send("data not receved")
            }
            const chat = new Chat({
                sender_id,receiveder_id,massage,time
            })
            chat.save().then(data=>{
               return res.status(200).send("data receved")
            }).catch(err=>{
                console.log(err);
               return res.status(400).send("data not receved")
            })
        },
        async loadChat(req,res){
            const {sender_id,receiveder_id} = req.body
            if(!sender_id,!receiveder_id){
                return res.status(400).send({data:"Data Not Found"})
            }
            const data = await Chat.find({$or:[{$and:[{sender_id},{receiveder_id}]},{$and:[{sender_id:receiveder_id},{receiveder_id:sender_id}]}]})
            return res.status(200).send(data)

        }




    }  
}

module.exports = chatController;