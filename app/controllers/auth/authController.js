var jwt = require('jsonwebtoken');
const User = require("../../model/auth/user");
const bcrypt = require("bcrypt")

const authController = () => {
    return {
        register(req, res) {

            res.render("auth/register")
        },
        async postRegister(req, res) {
            try {
                const { name, email, phone, password, cpassword } = req.body;
            if (!name, !email, !phone, !password, !cpassword) {
                req.session.msg = { type: "error", message: "All fields are required" }
                registerMsg(req, name, email, phone)
                return res.redirect("/register")
            }
            if (password.length < 6) {
                req.session.msg = { type: "error", message: "Password mustbe 6 carecter" }
                registerMsg(req, name, email, phone)
                return res.redirect("/register")
            }

            if (password != cpassword) {
                req.session.msg = { type: "error", message: "Confirm Password are not match" }
                registerMsg(req, name, email, phone)
                return res.redirect("/register")
            }

            const verifyUser = await User.findOne({ "email": email });
            if (verifyUser) {
                req.session.msg = { type: "error", message: "User already exist" }
                registerMsg(req, name,"", phone)
                return res.redirect("/register")
            }


            const hashPassword = await bcrypt.hash(password, 10)

            const user = new User({ name, email, password: hashPassword });
            const newUser = await user.save()
            if (!newUser) {
                req.session.msg = { type: "error", message: "Something went wrong" }
                registerMsg(req, name, email, phone)
                return res.redirect("/register")
            }
            req.session.msg = { type: "done", message: `Welcome ${newUser.name}` }
            setJWT(res,newUser._id)
            return res.redirect("/chat")
            } catch (error) {
                req.session.msg = { type: "error", message: "Something went wrong" }
                registerMsg(req, name, email, phone)
                return res.redirect("/register")
            }
            

        },
        login(req, res) {
            res.render("auth/login")
        },
        async postlogin(req,res){
            try {
                const {email, password} = req.body;
                if(!email, !password){
                    req.session.msg = { type: "error", message: "All fields are required" }
                    req.flash("email", email);
                    return res.redirect("/login")
                }
                const user = await User.findOne({"email":email});
                if(!user){
                    req.session.msg = { type: "error", message: "User not found" }
                    return res.redirect("/login")
                }
                console.log(user.isOnline);
                if(user.isOnline === "1"){
                    req.session.msg = { type: "error", message: "User already logged in" }
                    return res.redirect("/login")
                }
                const verifiedUser = await bcrypt.compare(password,user.password)
                if(verifiedUser === false){
                    req.session.msg = { type: "error", message: "Wrong email or password" }
                    return res.redirect("/login")
                }
                req.session.msg = { type: "done", message: `Welcome ${user.name}` }
                setJWT(res,user._id)
                return res.redirect("/chat")
            } catch (error) {
                req.session.msg = { type: "error", message: "Something went wrong" }
               
                return res.redirect("/login")
            }

        },
        logout(req,res){
            res.clearCookie("auth_token")
            req.session.msg = { type: "done", message: `You have successfully logged out!` }
            return res.redirect("/")
        }
    }
}

module.exports = authController;


const registerMsg = (req, name, email, phone) => {
    req.flash("name", name);
    req.flash("email", email);
    req.flash("phone", phone);
}

const setJWT = (res,id)=>{
    const token = jwt.sign({ id }, process.env.JWT_TOKEN,{ expiresIn: '1d' });
    res.cookie('auth_token',token, { maxAge: 24*60*60*1000, httpOnly: true })
}