const express = require('express');
const passport = require('passport');
const app = express.Router();
const managerC = require('../controller/managerController');
const theaterdb = require('../model/theaterModel');

app.get('/', passport.checkAuth, managerC.managerPage);

app.get('/addTheater', passport.checkAuth, managerC.addTheater);

app.post('/insertTheater', passport.checkAuth, theaterdb.uploadImg, managerC.insertTheater);

app.get('/showTheater', passport.checkAuth, managerC.showTheater);

app.get('/showTheaterseat/:id', passport.checkAuth, managerC.showTheaterseat)

app.get('/addMovie', passport.checkAuth, managerC.addMovie);

app.get('/addShow/:id', passport.checkAuth, managerC.addShow);

app.post('/insertMovieshow', passport.checkAuth, managerC.insertMovieshow)

app.get('/addManager', managerC.addManager)

app.post('/managerRegister', managerC.managerRegister)

app.get('/login', managerC.login);

app.post('/managerLogin', passport.authenticate('manager-rule', { failureRedirect: '/manager/login' }), managerC.managerLogin);

module.exports = app;