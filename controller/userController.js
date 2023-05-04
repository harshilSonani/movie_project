const moviedb = require('../model/movieModel');
const userdb = require('../model/userModel')
const theaterdb = require('../model/theaterModel');
const showdb = require('../model/movieShowModel');
const seatsdb = require('../model/seatsBookModel');

module.exports.userPage = async (req, res) => {
    var page = 1;
    var perpage = 5;
    let data = await moviedb.find({});
    return res.render('userPage', {
        data: data
    })
}

module.exports.showMovie = async (req, res) => {
    try {
        let data = await moviedb.findById(req.params.id);

        return res.render('userMovie_details', {
            data: data,
        });
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.bookMovie = async (req, res) => {
    try {
        let data = await theaterdb.find({});

        return res.render('userMovie_theater', {
            data: data
        });
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.bookShow = async (req, res) => {
    try {
        let data = await theaterdb.findById(req.params.id);
        let theaterID = await showdb.find({ theaterid: req.params.id });

        return res.render('userBookshow', {
            theaterID: theaterID
        });
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.register = async (req, res) => {
    return res.render('user_register-page');
}

module.exports.adminRegister = async (req, res) => {
    let data = await userdb.create(req.body);

    return res.redirect('back');
}

module.exports.login = (req, res) => {
    return res.render('user_login-page');
}

module.exports.adminLogin = async (req, res) => {
    return res.redirect('/');
}

module.exports.bookTickets = async (req, res) => {
    let data = await showdb.findById(req.params.id).populate('theaterid').exec();
    let showID = data.theaterid;
    let seats = await seatsdb.find({
        $and: [
            { showid: req.params.id },
            { time: req.query.time }
        ]
    });
    return res.render('userBookMovie', {
        data: data,
        setas: seats,
        time: req.query.time,
    });
}

module.exports.userBookSeats = async (req, res) => {
    req.body.userID = req.user.id;
    let data = await seatsdb.create(req.body);
    return res.redirect('back');
}