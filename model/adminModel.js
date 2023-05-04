const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const imgPath = ('/uploadImage/admin');

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    avatar : {
        type : String
    }
});

const store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', imgPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
})

adminSchema.statics.uploadImg = multer({storage:store}).single('avatar');
adminSchema.statics.adminPath = imgPath;

const admin = mongoose.model('admin', adminSchema)
module.exports = admin;