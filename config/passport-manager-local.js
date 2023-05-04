const passport = require('passport')
const passportLocal = require('passport-local').Strategy;
const managerDb = require('../model/managerModel');

passport.use('manager-rule', new passportLocal({
    usernameField: 'email'
}, async (email, password, done) => {
    let user = await managerDb.findOne({ email: email });
    if (!user || user.password != password) {
        console.log('email and password not match');
        return done(null, false);
    }
    return done(null, user);
}));

passport.checkAuth = (req, res, next) => {
    console.log('2')
    console.log(req.user)
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/manager/login");
};

passport.setAuth = (req, res, next) => {
    res.locals.user = req.user;
    return next()
}

module.exports = passport;