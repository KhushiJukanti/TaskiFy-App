const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
    id:Number,
    taskName:String,
    taskDesc:String,
    status:String,
    assigned:{
        type:Boolean,
        required:true,
        default:false
    }
})

module.exports = mongoose.model("task",TaskSchema)