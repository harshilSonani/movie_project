const express = require('express')
const port = 8001;
const app = express();

const passport = require('passport');
const passportLocal = require('./config/passport-admin-local');
const userLocal = require('./config/passport-user-local');
const managerLocal = require('./config/passport-manager-local');
const session = require('express-session');

const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(express.static('assets'));
app.use('/uploadImage', express.static('uploadImage'));
app.set('view engine', 'ejs');

app.use(session({
    name : 'harshil',
    secret : 'rnwe',
    saveUninitialized : false,
    resave : true,
    cookie : {
        maxAge : 60*100*1000
    }
}));

app.use(passport.initialize())
app.use(passport.session());
app.use(passport.setAuth);

app.use('/', require('./router/userRouter'));

app.listen(port, (err) => {
    if (err) {
        console.log('server is not run');
        return false;
    }
    console.log('server is run', port);
});