const jwt = require("jsonwebtoken")
const User = require("../model/auth/user")


const isverified = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token
        if (!token) {
            res.clearCookie("auth_token")
            req.session.msg = { type: "error", message: "You need to be logged in" }
            return res.redirect("/login")
        }
        const { id } = jwt.verify(token, process.env.JWT_TOKEN);
        if (!id) {
            res.clearCookie("auth_token")
            req.session.msg = { type: "error", message: "unauthorized access " }
            return res.redirect("/login")
        }

        const user = await User.findOne({"_id":id},{name:-1,email:-1,isOnline:-1});

        next()

    } catch (error) {
        res.clearCookie("auth_token")
        req.session.msg = { type: "error", message: "unauthorized access" }
        return res.redirect("/login")
    }

}


const islogin =async (req,res,next)=>{
    try {
        const token = req.cookies.auth_token
        if(!token){
            req.session.msg = { type: "error", message: "You need to be logged in" }
            next()
        }else{
            const {id} = jwt.verify(token,process.env.JWT_TOKEN)
            const user = await User.findOne({_id:id},{name:-1,email:-1,isOnline:-1})
            if(!user){
                res.clearCookie("auth_token")
                req.session.msg = { type: "error", message: "unauthorized access" }
                next()
            }else{
                res.redirect("/chat")
            }
        }

    } catch (error) {
        res.clearCookie("auth_token")
        req.session.msg = { type: "error", message: "unauthorized access" }
        next()
    }

}


const checkStatus =async (req,res,next)=>{
    try {
        const token = req.cookies.auth_token
        if(!token){
            res.locals.user = null
            next() 
        }else{
            const {id} = jwt.verify(token,process.env.JWT_TOKEN)
            const user = await User.findOne({_id:id},{name:-1,email:-1,isOnline:-1})
            if(!user){
                res.clearCookie("auth_token")
                res.locals.user = null
                next() 
            }else{
                const data = {
                    _id:id,
                    name:user.name,
                    email:user.email
                }
                res.locals.user = data
                next() 
            }
        }

    } catch (error) {
        res.clearCookie("auth_token")
        res.locals.user = null
        next() 
    }

}


module.exports = { isverified,islogin,checkStatus }