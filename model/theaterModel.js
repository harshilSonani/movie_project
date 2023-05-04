const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');
const imgPath = ('/uploadImage/theater')

const theaterSchema = mongoose.Schema({
    theater : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    img : {
        type : String,
        required : true,
    },
    row : {
        type : String,
        require : true,
    },
    seat : {
        type : String,
        require : true,
    }
});

const store = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, path.join(__dirname, '..', imgPath));
    },
    filename : (req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now());
    }
});

theaterSchema.statics.uploadImg = multer({storage : store}).single('img');
theaterSchema.statics.theaterImg = imgPath;

const theater = mongoose.model('theater', theaterSchema);
module.exports = theater;