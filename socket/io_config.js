
const {socketVerification} =require("./middleware/userVerification")
const initIoConfig = (io)=>{
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        // token verifivation
        socketVerification(token,next)
      });
    io.on("connection",(socket)=>{
        console.log(socket.id); 

        socket.on("data",data =>{
            console.log(data);
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


