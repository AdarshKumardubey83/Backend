/*
Server ko start karna  
Database se connect karna
*/
require('dotenv').config()
const app = require('./src/app');
const connectToDB = require('./src/config/database')

connectToDB()

console.log("MONGO_URI =", process.env.MONGO_URI);


app.listen(3000, ()=>{
    console.log("Shree Harivansh, Server is running on port 3000");
})