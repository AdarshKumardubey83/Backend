/*ye auth.routes.js file sirf authentication wali routes ko handle karegi like register,login and logout*/

const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/user.model');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

/**
 * POST /api/auth/register
 */
authRouter.post('/register', async(req,res)=>{
    const {name,email,password} = req.body;

    const isUserExists = await userModel.findOne({ email });

    if(isUserExists){
        return res.status(409)
        .json({
            message: 'User already exists'
        })
    }

    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash('sha256').update(password).digest('hex')
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            name: user.name,
            email: user.email
        }
    })
})

authRouter.get('/get-me', async (req,res) => {
    
    const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id);

    res.json({
        name: user.name,
        email: user.email
    })
})

authRouter.post('/login', async (req,res) =>{
    const { email, password } =  req.body;

    const user = await userModel.findOne({ email })

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    console.log(hash);


})

module.exports = authRouter; /*ye authRouter ke help se hum api toh create kar lenge , lekin jo express(humari application hai, ya server hai) usse integrate karne ke liye isko require karna hoga app.js mein */

