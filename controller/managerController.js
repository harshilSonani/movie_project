const theaterdb = require('../model/theaterModel');
const moviedb = require('../model/movieModel');
const showdb = require('../model/movieShowModel');
const managerdb = require('../model/managerModel');

module.exports.managerPage = (req, res) => {
    return res.render('managerDashboard');
}

module.exports.addTheater = (req, res) => {
    return res.render('addTheater')
}

module.exports.insertTheater = async (req, res) => {

    if (req.file) {
        req.body.img = theaterdb.theaterImg + '/' + req.file.filename
    }
    let data = await theaterdb.create(req.body);
    return res.redirect('back');
}

module.exports.showTheater = async (req, res) => {
    let data = await theaterdb.find({});

    return res.render('showTheater', {
        data: data
    });
}

module.exports.showTheaterseat = async (req, res) => {
    let data = await theaterdb.findById(req.params.id);

    return res.render('userBookMovie', {
        data: data
    });
}

module.exports.addMovie = async (req, res) => {
    let movieData = await moviedb.find({});

    return res.render('mamagerShowMovie', {
        movie: movieData,
    })
}

module.exports.addShow = async (req, res) => {
    let movieId = await moviedb.findById(req.params.id)
    let data = await theaterdb.find({});
    return res.render('manager_AddShow', {
        data: data,
        movieId: movieId
    })
}

module.exports.insertMovieshow = async (req, res) => {
    let data = await showdb.find({
        $and: [
            { theaterid: req.body.theaterid },
            { movieid: req.body.movieid }
        ]
    });
    if (data?.length) {
        let showdata = await showdb.findByIdAndUpdate(data[0].id, {
            $push: {
                time: req.body.time
            }
        })

        return res.redirect('back');
    } else {
        let show = await showdb.create(req.body);
        return res.redirect('back');
    }
}

module.exports.login = async (req, res) => {
    return res.render('manager_login');
}

module.exports.addManager = async (req, res) => {
    return res.render('manager_register')
}

module.exports.managerRegister = async (req, res) => {
    let data = await managerdb.create(req.body);
    return res.redirect('back');
}

module.exports.managerLogin = (req, res) => {
    return res.redirect('/manager')
}