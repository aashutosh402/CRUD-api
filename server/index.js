const express = require('express');
const mongoose = require('mongoose')
const app  = express()
const cors = require('cors');
const bodyParser = require("body-parser");
const User = require("./models/SignupSchema");
const mongo = require('mongodb')
const port = 4000;

app.use(cors());
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/mernproject").then(()=>{
    console.log("connection succesfull");
}).catch((error)=>{
    console.log("Error :" ,error)
});
app.get('/',(req,res)=>{
    res.send('Welcome to homepage')
})

app.post('/adduser',(req,res)=>{
    // console.log(req.body)
    const user = new User({
        name:req.body.name,email:req.body.email,password: req.body.password
    })
    user.save();
    return res.json({success:"data Submitted Succesfully"})
});

//Show user
app.get('/showuser',async(req,res)=>{
    let data = await User.find()
    console.log(data);
    return res.json(data);
})

// delete user
app.get('/deleteuser/:id',async(req,res)=>{
    let uid = req.params.id;
    let data = await User.deleteOne({_id:new mongo.ObjectId(uid)})
    return res.json("data deleted successfully")
})


app.get('/edituser/:id',async(req,res)=>{
    let uid  = req.params.id;
    let data = await User.findById({_id:uid})
    return res.json(data)

})

app.post('/updateuser',async(req,res)=>{
    let ObjectId = req.body._id
    let updatedata = await User.findByIdAndUpdate(ObjectId,{name:req.body.name,email:req.body.email,password:req.body.password})
    res.json({success:"updated"})
})

app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})