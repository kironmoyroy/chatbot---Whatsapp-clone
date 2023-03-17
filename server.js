require('dotenv').config()
const express = require("express")
var expressLayouts = require('express-ejs-layouts');
const path = require("path")
const app = express()
const http = require("http").createServer(app)
const PORT = process.env.PORT || 3001
const io = require("socket.io")(http)

const session = require('express-session')
const flash = require("express-flash")
const mongoose = require("mongoose")
cookieParser = require('cookie-parser')


//Middklewire
const {checkStatus} =require("./app/middleware/auth")

mongoose.connect(process.env.MONGOURI);
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Database connected.....");
}).on("err",()=>{
    console.error("Connection failed....");
})

// Session Config
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:1000*60*60},
}))
app.use(flash())
app.use(cookieParser())

//Global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.msg = req.session.msg
    delete req.session.msg
    next()
})


//Global Public File
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended:false}));
app.use(express.json())




// Set View engine
app.set("view engine","ejs")
app.set("views",path.join(__dirname + "/resources/views"))
app.use(expressLayouts);

app.get("*",checkStatus)
app.post("*",checkStatus)
require("./routes/web")(app)

http.listen(PORT,()=>{
    console.log(`Server is raning on ${PORT}`);
})

require("./socket/io_config")(io)