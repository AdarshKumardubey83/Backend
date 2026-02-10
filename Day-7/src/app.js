/*
Server ko create karna
 */

const express = require("express");
const noteModel = require("./models/notes.model");


const app = express();

app.use(express.json())

/*
- POST /notes
- req.body => {title,description}
*/

app.post("/notes",async (req,res)=>{
    const { title, description, age } = req.body

    const note = await noteModel.create({              //Mumbai wale cluster ke database mein create hoga isliye hume nhi pata ki kitne dare mein hoga kyuki internet ke through hoga , isliye  await laga diya(jitna time lag raha hai lagne do) await use karne ke liye likhna hota hai async , isliye async likha hua hai
        title, description , age
    }) 

    res.status(201).json({
        message: "Note created successfully",
        note
    })

})


/* 
- GET /notes
- fetch all the notes Data
 */

app.get("/notes", async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

module.exports = app