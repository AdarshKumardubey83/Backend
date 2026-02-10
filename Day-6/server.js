/*
server start karna
database se connect karna
*/

const app = require('./src/app');
const mongoose = require('mongoose');

function connecttodb(){
    mongoose.connect("mongodb+srv://adarshkumardubey50_db_user:UyQV9IyT1nNVAkco@revision-cluster.advqfjn.mongodb.net/")
    .then(()=>{
        console.log('connected to db');
    })}

connecttodb();  

app.listen(3000,()=>{
    console.log('Server is running');
})