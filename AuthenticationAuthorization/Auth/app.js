const express = require('express');
const path = require('path');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const userModel = require('./models/user');
const { ByteLengthQueuingStrategy } = require('stream/web');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); 
// app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.render('index')
})


app.post('/create',async (req,res)=>{
    const {username, email, password, age} = req.body;
   
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const createdUser = await userModel.create(
        {
            username,
            email,
            password: hash,
            age
        }
    )
  
    const token = jwt.sign({email:email}, "sdfrdxasdf");
    res.cookie("token", token);
    res.redirect('/');
})

app.get('/logout', (req,res)=>{
    res.cookie("token","");
    res.redirect("/");
})

app.get('/login', (req, res)=>{
    res.render("login")
})
app.post('/login',async (req, res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email:email});
    if(!user){
        res.send("Something went wrong");
    }
    const check = await bcrypt.compare(password,user.password);
    if(!check){
        res.send("Password is wrong");
    }else{
        res.send("You are loggend In....")
    }

})

app.get('/allusers', async (req, res)=>{
    const users = await userModel.find();
    res.send(users);
})
app.listen(2345);