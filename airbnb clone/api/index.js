const express = require('express')
const cors = require('cors');
const User = require("./models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongoose= require("mongoose");
const CookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
require('dotenv').config()
const app = express();
const bcrypt_salt = bcrypt.genSaltSync(5);
const jwtSecret = 'Tinhangwillbecomeasde';

app.use(express.json());
app.use(CookieParser());
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173'
}));
mongoose.connect(process.env.MONGO_URL)
app.get('/test', (req,res) =>{
    res.json("test ok")
});

app.post('/register',async (req,res) =>{
    const {name,email,password} = req.body;
    try{
        const userDoc = await User.create(
            {
                name,
                email,
                password : bcrypt.hashSync(password,bcrypt_salt),
            }
        );
        res.json(userDoc);
    }catch (e){
        res.status(422).json(e);
    }

})

app.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passwordValidate =bcrypt.compareSync(password,userDoc.password);
        if(passwordValidate){
            const oneDayInSeconds = 60 * 6; // 24 hours in seconds
            const expirationDate = new Date(Date.now() + oneDayInSeconds * 1000);
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id},
                jwtSecret,{},
                (err,token) => {
                if(err){throw err;}
                res.cookie('token', token,{}).json(userDoc);
            });

        }else {
            res.status(422).json("password is wrong");
        }
    }else{
        res.json('not found');
    }
})

app.get('/profile',(req,res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,userData) => {
            if(err) {throw err;}
            const userDoc = await User.findById(userData.id);
            res.json(userDoc);
        })
    }else{
        res.json(null);
    }
})

app.post('/logout',(req,res) => {
    res.cookie('token','').json(true);
})

app.post('/upload-by-link',async (req,res) => {
    const {link} = req.body;
    const newName = Date.now() + '.jpg';
    await imageDownloader.image({
        url:link,
        dest : __dirname + '/upload/' + newName
    });
    res.json(__dirname + '/upload/' + newName);
})
app.listen(4000);