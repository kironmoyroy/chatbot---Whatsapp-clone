const User = require("../app/model/auth/user")

const {socketVerification} =require("./middleware/userVerification")
const initIoConfig = (io)=>{
    io.use(async(socket, next) => {
        await User.findOneAndUpdate({"_id":socket.handshake.auth.token},{ $set: { "isOnline": "1" }})
        next()
      });
    

    io.on("connection",(socket)=>{
        socket.broadcast.emit("onlineStatus",socket.handshake.auth.token)
        socket.on("disconnect",async ()=>{
            await User.findOneAndUpdate({"_id":socket.handshake.auth.token},{ $set: { "isOnline": "0" }})
            socket.broadcast.emit("OfflineStatus",socket.handshake.auth.token)
        })
        socket.on("user",async data =>{
            try {
                const user = await User.find({_id: {$nin:[data]}},{name:-1,email:-1,isOnline:-1});
                socket.emit("user",user)                
            } catch (error) {
                console.log("Somethink Want Rong");
            }           
        })






        socket.on("massage",(msg)=>{
            
            socket.broadcast.emit("massage",msg)
        })
       

        socket.on("typing",(data)=>{
            socket.broadcast.emit("typing",data)
        })




    })
}

module.exports = initIoConfig


