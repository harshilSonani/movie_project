const mongoose = require('mongoose')
const multer = require('multer');
const BannerPath = ('/uploadImage/movie');
const path = require('path');

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    movieTime: {
        type: String,
        require: true
    },
    language: {
        type: String,
        require: true
    },
    movieType: {
        type: Array,
        require: true
    },
    about: {
        type: String,
        require: true
    },
    ScreenType: {
        type: Array,
        require: true
    },
    movieDate : {
        type : String,
        required : true
    },
    movieBanner: {
        type: String,
        required: true
    },
    moviePoster: {
        type: String,
        required: true
    },
    active : {
        type : Boolean,
        required : true,
    }
});

const Banner = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', BannerPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    },
});


const a = multer({ storage: Banner });
movieSchema.statics.multiImg = a.fields([{ name: 'movieBanner'},{name: 'moviePoster'}]);
movieSchema.statics.imgBanner = BannerPath;

const movieData = mongoose.model('movie', movieSchema);
module.exports = movieData;