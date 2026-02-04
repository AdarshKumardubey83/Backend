const express = require("express");

const app = express();

app.use(express.json()) //jo humara serve hota hai bydefault serve ke data ko nhi padh sakta , isliye ye  line hum likhte hai taki ke  req.body ka data padh sake

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





