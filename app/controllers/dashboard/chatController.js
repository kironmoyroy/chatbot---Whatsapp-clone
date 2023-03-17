const User = require("../../model/auth/user")

const chatController = () =>{
    return{
        async chat(req,res){
            const data = await User.find()
            res.render("dashboard/chat",{data})
        }
    }
}

module.exports = chatController;