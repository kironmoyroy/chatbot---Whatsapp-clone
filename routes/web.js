const authController = require("../app/controllers/auth/authController")
const chatController = require("../app/controllers/dashboard/chatController")
const indexController = require("../app/controllers/indexController")

// Middlewire
const {isverified,islogin} = require("../app/middleware/auth")

const initRoute = (app)=>{
    app.get("/", indexController().index)
    
    app.get("/register",islogin,authController().register)
    app.post("/register",islogin,authController().postRegister)
    app.get("/login",islogin,authController().login)
    app.post("/login",islogin,authController().postlogin)
    app.get("/logout",isverified,authController().logout)



    app.get("/chat",isverified,chatController().chat)


}




module.exports = initRoute