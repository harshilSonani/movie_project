const passport = require('passport')
const passportLocal = require('passport-local').Strategy;
const userdb = require('../model/userModel')

passport.use('user-rule',new passportLocal({
    usernameField: 'email'
}, async (email, password, done) => {
    try{
        let cus = await userdb.findOne({ email: email });
        console.log(cus)

    if (!cus || cus.password != password) {
        console.log('email and password not match');
        // return done(null, false);
    }
    return done(null, cus);
    }
    catch(err){
        console.log(err)
    }
}));

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/login");
};

passport.setAuth = (req, res, next) => {
    res.locals.user = req.user;
    return next();
}

module.exports = passport;