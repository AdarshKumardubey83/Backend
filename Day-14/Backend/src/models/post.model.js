const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl:{
        type: String,
        required: [true ,"imgUrl is required for creting "]
    },
    user: {
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required: [true, "user id is required for creating an post "]
    }
})

const postmodel = mongoose.model("posts", postSchema);

module.exports = postmodel;