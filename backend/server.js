const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./routes/task")
const authRoutes = require("./routes/auth")

mongoose.connect("mongodb://localhost:27017/task-app")

const app = express();

app.use(express.json()) //for using this post the  data from postman
app.use(cors())

// function checkToken(req,res,next){
//     let token = req.headers.authorization
//     if(!token){
//         res.send("you are not allowed in task list")
//     }else{
//         next()
//     }
// }

function checkPaidorNot(req,res,next){
    let userPaid = true
    if(!userPaid){
        res.send('You have to pay first')
    }else{
        next()
    }
}
app.use("/task",checkPaidorNot,taskRoutes)

app.use("/auth",authRoutes)

app.get("/", function(req,res){
    res.send("hello world")
})

app.listen(7000,()=>{
    console.log("server is running at 7000")
})