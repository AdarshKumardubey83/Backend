const express = require("express");
const app = express();

app.use(express.json());

const notes = [
    // {
    //     "title": "test title 1",
    //     "description": "test description 1"
    // }
]

/*POST /notes*/

app.post("/notes", (req,res) => {  /*API ka method hai post aur api ka naam hai /notes*/ 
    console.log(req.body); 
    notes.push(req.body);
    res.send("RadhaVallabh Shree Harivansh");
})

/*GET /notes*/

app.get("/notes", (req,res) => {
    res.send(notes);
})

/*DELETE /notes/0*/
/*params*/

app.delete("/notes/:index", (req,res) => {
    delete notes[ req.params.index ]
    
    res.send("note deleted successfully")
})

/* PATCH /notes/:index */
/* req.body = {description :- "sample modified description."} */ 

app.patch("/notes/:index",(req,res)=>{

    notes[req.params.index].description = req.body.description;
    res.send("Note updated successfully");

})



module.exports = app 




