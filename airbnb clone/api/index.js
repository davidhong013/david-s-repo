const express = require('express')
const cors = require('cors');
const User = require("./models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongoose= require("mongoose");
const CookieParser = require('cookie-parser');
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
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id},
                jwtSecret,{},
                (err,token) => {
                if(err){throw err;}
                res.cookie('token',
                    token,
                    {sameSite : 'none',secure:false}
                ).json(userDoc);
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
app.listen(4000);