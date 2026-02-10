const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})

const noteModel = mongoose.model("notes", noteSchema)  //notes is collection jiske andar bahut saare notes aayenge

module.exports = noteModel

