const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const TaskModel = require("../models/task");
const AuthModel = require("../models/auth")
// const userTask = require("../models/userTask")
const UserTaskModel = require("../models/userTask");


router.get("/summary/:userId", async function (req, res) {
    console.log(req.params.userId)
    let InProgressCount = await UserTaskModel.find({$and:[{status: 'Inprogress' },{userId:new mongoose.Types.ObjectId( req.params.userId)}]}).count()
    let CompletedCount = await UserTaskModel.find({$and:[{status: 'completed' },{userId:new mongoose.Types.ObjectId( req.params.userId)}]}).count()
    res.send({ InProgressCount, CompletedCount })
});


router.get("/myTask/:userId", async function (req, res) {
    let myTasks = await UserTaskModel.find({ userId: req.params.userId }).populate("taskId", "taskName taskDesc").exec();
    res.send(myTasks)
})




router.get("/:userId/byStatus/:status", async function (req, res) {
    const { status } = req.params;
    if (status === "All") {
        let tasks = await UserTaskModel.find({ userId: req.params.userId }).populate("taskId", "taskName taskDesc").exec();
        return res.send(tasks)
    } else {
        let tasks = await UserTaskModel.find({ $and: [{ userId: req.params.userId }, { status: req.params.status }] }).populate("taskId", "taskName taskDesc").exec();
        return res.send(tasks)
    }
})

router.post("/assignTask", async function (req, res) {
    // here logic will come to assign task to particular user
    // get the userId and then default status to inprogress
    const { taskId, userId, status } = req.body
    const task = await TaskModel.findById(taskId);
    const user = await AuthModel.findById(userId);

    if (task && user) {
        const newUserTask = new UserTaskModel(req.body);
        const createdUsertask = await newUserTask.save();
        task.assigned = true;
        
        task.save();
        res.send(createdUsertask)
    } else {
        res.send("user not Exist")
    }

})

router.put("/completeTask", async function (req, res) {

    const { id, status } = req.body
    const updatedTask = await UserTaskModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { status: status })
    res.send(updatedTask)

})

module.exports = router