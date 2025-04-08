const express = require('express');
require('./backend/db/config');
const User=require("./backend/db/User");
const app = express();

app.post("/register",(req,res)=>{
    res.send("api in progress")
})


// Start the server
app.listen(5000);