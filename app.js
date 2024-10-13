const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const mongoUrl = "mongodb+srv://kuzhanthaivel272:admin@cluster0.0vrv6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


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


app.post("/register",async(req, res)=> {
    const {username,password} = req.body;

    const oldUser = await User.findOne({username});

    if (oldUser){
        return res.send({data:"Username already exists"})
    }
    try {
        await User.create ({
            username,
            password,
        });
        res.send({status:"ok",data:"user Created"})
    } catch (error) {
        res.send({status:"Error",data:error})
    }

})

app.listen(5001,()=>{
    console.log('Server is running on port 5001');
});