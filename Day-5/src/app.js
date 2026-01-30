/*
server ko create karna
server ko config karna
*/

const express = require("express"); /*server ko create karna */

const app = express();  /*server ko config karna */

app.use(express.json()); /*Jab tak aap express.json ka use nhi karte tabtak express ka server req.body ke andar ka data padh hi nhi sakta  */

const notes = []

/*POST /notes*/ 

app.post("/notes",(req,res)=>{

    notes.push(req.body);

    res.status(201).json({
        message:"Note created successfully"
    });


})

/*GET /notes */
app.get("/notes", (req,res)=>{
    res.status(200).json({
        notes: notes
    })
})

/*DELETE /notes:index */

app.delete("/notes/:index", (req,res) => {
    delete notes[req.params.index];
    res.status(204).json({
        message: "Note deleted successfully."
    })
})

/*PATCH /notes/:index */

app.patch("/notes/:index", (req,res) => {
    notes[req.params.index].description = req.body.description;
    res.status(200).json({
        message: "Note updated successfully."
    })
})

module.exports = app;