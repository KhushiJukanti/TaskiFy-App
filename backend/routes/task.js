const express = require('express');
const mongoose = require('mongoose');
const TaskModel = require("../models/task");
const UserTaskModel = require("../models/userTask")
const router = express.Router();

router.get("/summary", async function (req, res) {
    let TotalCount = await TaskModel.find({}).count();
    let AvailableTaskCount = await TaskModel.find({ assigned: false }).count();
    let AssignedTaskCount = await TaskModel.find({ assigned: true }).count()

    // let NotStartedCount = await TaskModel.find({ status: 'not_started' }).count();
    //  only for admin
    let InProgressCount = await UserTaskModel.find({ status: 'Inprogress' }).count()
    let CompletedCount = await UserTaskModel.find({ status: 'completed' }).count()

    res.send({ TotalCount, InProgressCount, CompletedCount, AvailableTaskCount, AssignedTaskCount })
});

router.get("/all", async function (req, res) {
    let tasks = await TaskModel.find({ assigned: { "$ne": "true" } })
    res.send(tasks)
})

router.get("/available", async function (req, res) {
    let tasks = await TaskModel.find({ assigned: { "$ne": "true" } })
    res.send(tasks)
})

router.post("/create", async function (req, res) {

    // from client if you pass data that comes as a re.body
    // const {taskName,taskdesc,status,assigned,id} = req.body === {...req.body}

    const newtaskData = new TaskModel({ ...req.body, assigned: false })
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


// router.delete("/:id", async function (req, res) {
//     try {
//         const { id } = req.params;
//         const deletedTask = await TaskModel.findByIdAndDelete(id);
//         if (deletedTask) {
//             res.sendStatus(200); // Send status code 200 for success
//         } else {
//             res.sendStatus(404); // Task not found
//         }
//     } catch (error) {
//         console.error('Error deleting task:', error);
//         res.sendStatus(500); // Internal server error
//     }
// });


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