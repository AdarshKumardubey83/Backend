const express = require('express')
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken')
const authRouter = express.Router()

authRouter.post("/register", async (req,res) => {
    const { email,name,password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists with this email address"
        })
    }

    const user = await userModel.create({
        email, password , name
    })

    const token = jwt.sign(
        {
        id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "user registered",
        user,
        token
    })
})

authRouter.post("/protected", (req,res)=>{
    console.log(req.cookies);

    res.status(200).json({
        message: "This is a protected route"
    })
})

module.exports = authRouter


