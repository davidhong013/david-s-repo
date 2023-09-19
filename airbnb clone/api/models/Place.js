const mongoose = require('mongoose');
const {model} = require("mongoose");
const placeSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number
});

const PlaceModel = model('Place',placeSchema);

module.exports = PlaceModel;