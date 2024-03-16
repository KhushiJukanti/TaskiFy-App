const express = require("express");
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const path = "path"
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.filename)
    },
})
const uploadStorage = multer({ storage: storage })



const AuthModel = require("../models/auth")

const router = express.Router();


// Middleware to serve static files
// router.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));



router.post("/signup", async function (req, res) {
    // first check is user present with given email
    //  if yes then return error message to frontend

    // if noo--  then register or signup

    const { fullNmae, email, password, repassword } = req.body
    let isUserExist = await AuthModel.findOne({ email: email })
    if (isUserExist) {
        return res.send({ message: "User already Exist", success: false })
    }
    const newUser = new AuthModel({ ...req.body, active: true })
    const createUser = await newUser.save();
    res.send({ message: "user Signup successfully", success: true });
})

router.post("/login", async function (req, res) {
    //  first check is user exist or not
    //  if user present with given email
    // check enterd password is equal to stored password or not
    // otherwise send error message password is wrong

    //  if user not present then send error user not exist

    const { fullNmae, email, password, repassword } = req.body

    let isUserExist = await AuthModel.findOne({ email: email })
    if (isUserExist) {
        if (password === isUserExist.password) {
            // token generation line and pass to client

            if (isUserExist.active === false) {
                return res.send({ message: "your account has been deactivated", success: false })
            } else {
                let token = jwt.sign({ email: isUserExist.email, _id: isUserExist._id }, "testkey")
                return res.send({ message: "User Login Succefully", success: true, token: token, email: isUserExist.email, userId: isUserExist._id, role: isUserExist.role })
            }

        } else {
            return res.send({ message: "Invalid credentials", success: false })
        }

    } else {
        return res.send({ message: "User Not Exist", success: false })
    }


})

router.put("/changepassword", async function (req, res) {

    // first will check is that user email present or not 
    // if email found the update the password
    // else send user not found message
    const { email, oldPassword, newPassword } = req.body;
    // Find the user by email
    let user = await AuthModel.findOne({ email });
    if (user) {
        user.password = newPassword;
        let updateduser = await user.save();
        res.send(updateduser)
    } else {
        res.send({ message: "User Not Exist" })
    }

});


router.put("/activate_deactivate", async function (req, res) {
    const { id, active } = req.body
    const updatedUser = await AuthModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { active: active })
    res.send(updatedUser)

});


router.get("/profile/:email", async function (req, res) {
    let user = await AuthModel.findOne({ email: req.params.email })
    res.send(user)
})


router.get("/users", async function (req, res) {
    let users = await AuthModel.find({})
    res.send(users)
})


// router.post("/profile/:email", async function(req,res){

//     const fileName = req.files.profile.fileName
//     const fileData = req.files.profile;
//     const uploadPath = path.join(__dirname, "../", "uploads")
//     fileData.mv(uploadPath + "/" + fileName, async function (err){
//         if(err)
//             return res.send(err)
//         console.log(uploadPath +  "/" + fileName);
//         const updatedUser = await AuthModel.updateOne({email:req.params.email}, {profilepic:fileName})
//         res.send(updatedUser)
//     })
// })


router.post("/profile/:email", uploadStorage.single("profilepic"), async function (req, res) {
    console.log("hello")
    try {
        const fileName = req.file.filename; // Get the filename assigned by multer
        const updatedUser = await AuthModel.findOneAndUpdate({ email: req.params.email }, { profilepic: fileName }, { new: true }); // Find and update the user's profile pic
        res.send(updatedUser);
    } catch (error) {
        console.error("Error updating profile pic:", error);
        res.status(500).send("Internal server error");
    }
});



module.exports = router