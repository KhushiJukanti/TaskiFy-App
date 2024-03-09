const express = require('express');
const mongoose = require('mongoose');
const TaskModel = require("../models/task");
const router = express.Router();

router.get("/summary", async function (req, res) {
    let TotalCount = await TaskModel.find({}).count();
    let NotStartedCount = await TaskModel.find({ status: 'not_started' }).count();
    let InProgressCount = await TaskModel.find({ status: 'Inprogress' }).count()
    let CompletedCount = await TaskModel.find({ status: 'completed' }).count()

    res.send({ TotalCount, NotStartedCount, InProgressCount, CompletedCount })
});

router.get("/all", async function (req, res) {
    let tasks = await TaskModel.find({ status: { "$ne": "completed" } })
    res.send(tasks)
})

router.post("/create", async function (req, res) {

    // from client if you pass data that comes as a re.body
    // const {taskName,taskdesc,status,assigned,id} = req.body === {...req.body}

    const newtaskData = new TaskModel({ ...req.body })
    const createdTask = await newtaskData.save();
    res.send(createdTask)
})



router.delete("/:id", async function (req, res) {
    // for object id..........

    console.log(req.params)
    const { id } = req.params;
    console.log(typeof (id))
    const deleteData = await TaskModel.findByIdAndDelete(id);
    res.send("data deleted successfully")

    //  for task id........
    // const taskId = req.params.id;  // this is the 'id' field mentioned in your document
    // const deleteData = await TaskModel.findOneAndDelete({id: taskId})
    // if(deleteData){
    //     res.send("Task deleted successfully");
    // }else{
    //     res.status(404).send("Task not Found");
    // }
})


router.get("/:id", async function (req, res) {
    // let task  = await TaskModel.findOne({id : req.params.id});
    // res.send(task)
    const { id } = req.params;
    let task = await TaskModel.findById(id)
    res.send(task)
})

router.put("/update/:id", async function (req, res) {
    // for object id..........

    console.log(req.params)
    const { id } = req.params;
    const updatedTask = await TaskModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { ...req.body })
    res.send(updatedTask)

})

router.get("/byStatus/:status", async function (req, res) {
    const { status } = req.params;
    if (status === "All") {
        let tasks = await TaskModel.find({})
        return res.send(tasks)
    } else {
        let tasks = await TaskModel.find({ status: status })
        return res.send(tasks)
    }

})




module.exports = router