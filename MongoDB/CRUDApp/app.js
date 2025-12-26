const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
const userModel = require('./models/user')
app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/read',async (req,res)=>{
    const users = await userModel.find();
    res.render('read',{users});
})

// creating user
app.post('/create',async (req,res)=>{
    const {name, email, image} = req.body;
    const createdUser = await userModel.create({
        name,
        email,
        image
    })
    res.redirect('/read');
})
// deleting the entry

app.get('/delete/:id',async (req,res)=>{
    const user = await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect('/read')
})

app.get('/edit/:id', async (req, res)=>{
    const user = await userModel.findOne({_id:req.params.id});
    res.render('edit',{user});
})

app.post('/update/:id', async (req,res)=>{
    const {name,email,image}=req.body;
    const user = await userModel.findOneAndUpdate({_id:req.params.id},{name,email,image});
    res.redirect('/read');
})
app.listen(3000,()=>{
    console.log('Server is running on PORT 3000');
})