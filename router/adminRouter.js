const express= require('express')
const app = express.Router();
const adminC = require('../controller/adminController');
const moviedb = require('../model/movieModel');
const admin = require('../model/adminModel');
const passport = require('passport');
const admindb = require('../model/adminModel');


app.get('/login', adminC.login);

app.post('/adminLogin', passport.authenticate('admin', {failureRedirect : '/admin/login'}), adminC.adminLogin)

app.get('/register', adminC.register);

app.post('/adminRegister', adminC.adminRegister);

app.get('/', passport.checkAuthentication, adminC.adminPage);

app.get('/addMovie', passport.checkAuthentication, adminC.addMovie);

app.post('/insertMovie', passport.checkAuthentication, moviedb.multiImg, adminC.insertMovie);

app.get('/showMovie', passport.checkAuthentication, adminC.showMovie);

app.get('/deleteMovie/:id', passport.checkAuthentication, adminC.deleteMovie)

app.get('/deActive/:id', passport.checkAuthentication, adminC.deActive);

app.get('/active/:id', passport.checkAuthentication, adminC.active)

app.get('/adminProfile', passport.checkAuthentication, adminC.adminProfile);

app.get('/updateAdminRecord', passport.checkAuthentication, adminC.updateAdminRecord);

app.post('/updateAdmin', passport.checkAuthentication, admindb.uploadImg, adminC.updateAdmin);

app.post('/changePass', passport.checkAuthentication, adminC.changePass)

app.get('/logout', passport.checkAuthentication, adminC.logout)


module.exports = app;