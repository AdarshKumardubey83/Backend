/* 
is file ke 2 main kaam hai :
- server ko start karna
- database se connect karna
*/

const app = require('./src/app');

const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to Database")
        })
}

connectToDb()

app.listen(3000,()=>{
    console.log('Shree Harivansh, Server is Working on port 3000');
})