const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const jwt = require('jsonwebtoken');


const mongoUrl = "mongodb+srv://kuzhanthaivel272:admin@cluster0.0vrv6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const JWT_SECRET = "kdfkdfyugwefyguidhjjdsuir74jw9347343";

mongoose.connect(mongoUrl).then(()=> {
    console.log("mongodb successfully connected");
}).catch((e) =>{
    console.error("Failed to connect to mongodb", e);
});

require('./UserDetails.js')

const User = mongoose.model('UserInfo');
app.get("/", (req, res)=> {
    res.send("Hello, World!");
});


app.post("/login-user",async(req, res)=> {
    const {username,password} = req.body;

    const oldUser = await User.findOne({username});

    if (!oldUser){
        return res.send({data:" user does not exists"})
    }
    if (oldUser.password == password){
        const token=jwt.sign({username: oldUser.password},JWT_SECRET);
        if(res.status(201)){
            return res.send({status: "ok", data: token})      
         }
         else {
            return res.send({error: "error"});
         } 
    }

})





app.listen(5001,()=>{
    console.log('Server is running on port 5001');
});