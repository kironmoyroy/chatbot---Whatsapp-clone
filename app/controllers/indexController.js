


const indexController = ()=>{
    return{
        index(req,res){
            res.render("index/home")
        }

    }
}


module.exports =indexController