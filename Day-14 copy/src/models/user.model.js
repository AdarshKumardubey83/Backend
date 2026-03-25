const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists"],           /*Array format ka matlab:[ condition , error_message ] */                       /*unique username hona chahiye */ 
        required: [true, "Username is required"]                                 /*Bina Username ke koi sa bhi user nhi create kar paoge */
    },
    email :{
        type: String,
        unique: [true, "Email already exists"],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    bio: String,
    profileImage: {
        type: String,
        default:"https://ik.imagekit.io/adarshharivanshi/download%20(1).png"  /*agar user apna profile img upload nhi karega toh default mein jo profile img rahegi , yahi rahegi */
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel