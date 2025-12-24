const express = require('express')
const app = express();
app.use(express.json())
const userModel = require('./usermodel');
app.get('/', (req, res)=>{
    res.send("Hey my dear Memo");
})

app.get('/create',async (req, res)=>{
    let createdUser = await userModel.create({
        name:"Yashika",
        eamil:"yashika@gmail.com",
        username:"ashika"
    })

    res.send(createdUser);
})

app.get('/update',async (req, res)=>{
    let updatedUser = await userModel.findOneAndUpdate({username:"yash"},{name:"Yash Galpelli"},{new:true});

    res.send(updatedUser);
})

app.get('/read',async (req, res)=>{
    let users = await userModel.find();
    res.send(users);
})

app.get('/delete', async (req,res)=>{
    let user = await userModel.findOneAndDelete({username:"yash"})
    res.send(user);
})
app.listen(2000);