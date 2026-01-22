const express = require('express');
const app = express(); // server instance create karna 

app.get('/', (req,res) => {
    res.send("Adarsh")
})

app.get('/about', (req,res) => {
    res.send("Shree harivansh,This is about page")
})

app.listen(3000); // server start karna 