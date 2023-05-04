const passport = require('passport')
const passportLocal = require('passport-local').Strategy;
const admindb = require('../model/adminModel');
const userdb = require('../model/userModel');
const managerdb = require('../model/managerModel')

passport.use('admin', new passportLocal({
    usernameField: 'email'
}, async (email, password, done) => {
    let user = await admindb.findOne({ email: email });

    if (!user || user.password != password) {
        console.log('email and password not match');
        return done(null, false);
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    let admin = await admindb.findById(id);
    let manager = await managerdb.findById(id);
    let user = await userdb.findById(id);

    if (admin != null) {
        return done(null, admin);
    }
    else if (manager != null) {
        return done(null, manager)
    }
    else if (user != null) {
        return done(null, user);
    }
    else {
        return done(null, false);
    }

})

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/admin/login");
};

passport.setAuth = (req, res, next) => {
    res.locals.user = req.user;
    return next();
}

module.exports = passport;