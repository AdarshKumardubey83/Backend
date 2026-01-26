const express = require("express");

const app = express();

app.use(express.json()) //is line ke bina hum req.body ka data nhi padh sakte

const notes = []

app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.send("Shree Harivansh,note created");
})

app.get("/notes",(req,res)=>{                    //API Ka naam same hai lekin method alag hai 
    res.send(notes)
})

app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000");
})





