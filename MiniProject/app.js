const cookieParser = require('cookie-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const isLoggedIn = (req, res, next)=>{
    if(req.cookies.token === "") res.redirect('/login');
    else{
        const data = jwt.verify(req.cookies.token, "yash");
        req.user = data;
    }
    next();
}
app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.post('/register', async (req,res)=>{
    const {name, username, email, password, age} = req.body;

    const user = await userModel.findOne({email});
    if(user) return res.status(500).send("User is already exists");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createdUser = await userModel.create({
        name,
        username,
        password:hash,
        email,
        age
    })

    let token = jwt.sign({email:email, userid: user.id}, "yash");
    res.cookie("token",token);
    res.send('registered');
})

app.post('/login', async (req,res)=>{
     const {email, password} = req.body;

    const user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong");

    bcrypt.compare(password, user.password, (err, result)=>{
        if(result){
             let token = jwt.sign({email:email, userid: user.id}, "yash");
             res.cookie("token",token);
             res.status(200).redirect("/profile")
        }else res.redirect('/login');
    })

})

app.get('/logout', (req,res)=>{
    res.cookie('token','');
    res.redirect('/login');
})

app.get('/profile',isLoggedIn, async (req,res)=>{
    // console.log(req.user);
    const user = await userModel.findOne({email:req.user.email}).populate("posts");
    // console.log(user);
    res.render("profile",{user})
})

app.post('/post',isLoggedIn, async (req,res)=>{
    const user = await userModel.findOne({email:req.user.email});
    const {content} = req.body;
    const post = await postModel.create(
        {
            user:user.id,
            content
        }
    )

    user.posts.push(post.id);
    await user.save();
    res.redirect('/profile')
})

app.get('/like/:id',isLoggedIn, async (req, res)=>{
    const post = await postModel.findOne({_id:req.params.id}).populate("user");
    // console.log(req.user);
    // the below logic is implementation for like and unlike functionality
    // post.likes.indexOf() - find out the index of particular userid
    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    }else{
        const index = post.likes.indexOf(req.user.userid);
        post.likes.splice(index,1);
    }
    await post.save();
    res.redirect('/profile')
})

app.get('/edit/:id', async (req,res)=>{
    const post = await postModel.findOne({_id:req.params.id}).populate('user');
    res.render('edit',{post});
})

app.post('/update/:id', async (req,res)=>{
    const post = await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content});
    res.redirect('/profile')
})

app.listen(4000,()=>{
    console.log("The app is working on 4000")
})