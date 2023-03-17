const User = require("../../app/model/auth/user")

const socketVerification =async (token, next) => {
    const err = new Error("not authorized 1");
    const err2 = new Error("not authorized 2");
    try {
        if(token){
            console.log(token);
            const user =await User.findOne({"_id":id})
            console.log(user);
        }else{
            next(err)
            
        }

           
    } catch (error) {
        next(err2)
    }
  

}



module.exports = { socketVerification }