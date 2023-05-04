const express = require('express')
const app = express.Router();
const userC = require('../controller/userController');
const passport = require('passport');

app.get('/', userC.userPage);

app.get('/showMovie/:id', userC.showMovie)

app.get('/bookMovie', userC.bookMovie)

app.get('/bookTickets/:id',  userC.bookTickets);

app.post('/userBookSeats', passport.checkAuthentication, userC.userBookSeats)

app.get('/register', userC.register)

app.post('/adminRegister', userC.adminRegister)

app.get('/bookShow/:id', userC.bookShow)

app.get('/login', userC.login)

app.post('/userLogin', passport.authenticate('user-rule', { failureRedirect: '/login' }), userC.adminLogin);

// other router

app.use('/admin', require('../router/adminRouter'));

app.use('/manager', require('../router/managerRouter'));

module.exports = app;