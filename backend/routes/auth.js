const express = require("express");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const AuthModel = require("../models/auth")

const router = express.Router();

router.post("/signup", async function (req, res) {
    // first check is user present with given email
    //  if yes then return error message to frontend

    // if noo--  then register or signup

    const { fullNmae, email, password, repassword } = req.body
    let isUserExist = await AuthModel.findOne({ email: email })
    if (isUserExist) {
        return res.send({ message: "User already Exist", success: false })
    }
    const newUser = new AuthModel({ ...req.body })
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

            let token = jwt.sign({ email: isUserExist.email, _id: isUserExist._id }, "mysecretkey")
            return res.send({ message: "User Login Succefully", success: true, token: token, email: isUserExist.email })
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
        res.send(updateduser )
    } else {
        res.send({ message: "User Not Exist" })
    }

});


router.get("/profile/:email", async function (req, res) {
    let user = await AuthModel.findOne({ email: req.params.email })
    res.send(user)
})






module.exports = router