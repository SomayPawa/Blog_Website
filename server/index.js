const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
const url = "mongodb+srv://somaypawa:somaypawa@cluster0.szcz6eq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(url)
.then(()=>{
    console.log("connection successfully")
})
.catch((error)=>{
    console.log("connection failed");
})
app.use(cors({
    origin:["https://deploy-mern-1whq.vercel.app"],
    methods:["POST","GET"],
    credentials:true
}))
app.use(express.json());
app.use('/',require('./routes/auth-router'));
// aab game hoga routes and controller ke 
app.listen(PORT,()=>{
    console.log(`server is running this port number ${PORT}`);
})