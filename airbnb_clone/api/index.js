const express = require('express')
const cors = require('cors');
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongoose= require("mongoose");
const CookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config()
const app = express();
const bcrypt_salt = bcrypt.genSaltSync(5);
const jwtSecret = 'Tinhangwillbecomeasde';
var ObjectId = require('mongoose').Types.ObjectId;

app.use(express.json());
app.use(CookieParser());
app.use('/upload',express.static(__dirname + '/upload'));
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173'
}));
mongoose.connect(process.env.MONGO_URL)

function getUserFromReq(req){
    return new Promise((resolve,reject) => {
        jwt.verify(req.cookies.token,jwtSecret,{},async (err,userData) => {
            if(err) throw err;
            resolve(userData);
        });
    })


}
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
                res.cookie('token', token,{}).json(userDoc);
            });

        }else {
            res.status(422).json("password is wrong");
        }
    }else{
        res.status(422).json("email is not found");
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
    const newName = 'photo'+Date.now() + '.jpg';
    await imageDownloader.image({
        url:link,
        dest : __dirname + '/upload/' + newName
    });
    res.json(newName);
})

const photoMiddleware = multer({dest:'upload/'})
app.post('/upload-user-photo',photoMiddleware.array('photos',100),(req,res) => {
    const uploadedFiles = [];
    for(let i = 0;i<req.files.length;++i){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newPath = path + '.' +ext;
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath.replace('upload/',''));
    }
    res.json(uploadedFiles);
});

app.post('/places',(req,res) => {
    const {token} = req.cookies;
    const {
        title,address,addedPhotos,description,
        perks,checkIn,checkOut,maxGuests,price
        } = req.body;
    jwt.verify(token,jwtSecret,{},async (err,userData) => {
        if(err) {throw err;}
        const placeDoc = await Place.create({
            owner:userData.id,
            title,address,photos:addedPhotos,description,
            perks,checkIn,checkOut,maxGuests,price
        });
        res.json(placeDoc);
    })
})

app.get('/user-places',(req,res) => {
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,userData) => {
        // const id = userData.id;
        res.json(await Place.find({owner : userData.id}));
        });
})

app.get('/places/:id',async (req, res) => {
    const {id} = req.params;
    res.json(await Place.findById(id));
});

app.put('/places', async (req,res)=>{
    const {token} = req.cookies;
    const {
        id,title,address,addedPhotos,description,
        perks,checkIn,checkOut,maxGuests,price
    } = req.body;
    jwt.verify(token,jwtSecret,{},async (err,userData) => {
        if(err) throw err;
        const placeDoc = await Place.findById(id);

        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title,address,photos:addedPhotos,description,
                perks,checkIn,checkOut,maxGuests,price
            })
            await placeDoc.save();
            res.json('ok');
        }
    });
});

app.get('/places',async (req,res) => {
    res.json(await Place.find());
})


app.post('/booking', async (req,res) => {
    const userData = await getUserFromReq(req);
    const {
        place,checkin,checkout, numofGuests,name,phone,price} = req.body;
        Booking.create({
            place,checkin,checkout, numofGuests,name,phone,price,user:userData.id
        }).then((doc) => {
            res.json(doc);
        }).catch((err) => {
            try {
                throw err; // Throw the error for the outer catch block to handle
            } catch (error) {
                res.status(422).json("booked the apartment wrong");
            }
        });
})


app.get('/bookings',async (req,res)=>{
    const userData = await getUserFromReq(req);
    res.json(await Booking.find({user:userData.id}).populate('place'));
})

app.delete('/bookings/:id', async (req,res) => {
    let {id} = req.params;
    const CurrBooking = await Booking.findById(id);
    if(CurrBooking){
        await Booking.deleteOne({_id : id});
        res.json("deleted succefully");
    }else{
        res.status(422).json("the booking is not found");
    }
});
app.listen(4000);