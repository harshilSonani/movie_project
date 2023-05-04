const moviedb = require('../model/movieModel');
const fs = require('fs')
const path = require('path');
const admindb = require('../model/adminModel');

module.exports.adminPage = (req, res) => {
    return res.render('AdminDashboard')
}

module.exports.addMovie = (req, res) => {
    return res.render('addMovie');
}

module.exports.insertMovie = async (req, res) => {

    if(req.files){
            req.body.movieBanner = moviedb.imgBanner +'/'+ req.files.movieBanner[0].filename;
            req.body.moviePoster = moviedb.imgBanner +'/'+ req.files.moviePoster[0].filename;
    }
    req.body.active = true;
    req.body.phone = '';
    let data = await moviedb.create(req.body);

    return res.redirect('back');
}

module.exports.showMovie = async (req,res)=>{
    let search = '';
    let page = 1;
    lat = perPage = 2;
    if(req.query.search){
        search = req.query.search;
    }
    let data = await moviedb.find({
        $or : [
            {name : {$regex : '.*'+ search +'.*'}}
        ]
    }).skip((page - 1) * perPage)

    return res.render('admin_show_movie',{
        data : data
    });
}

module.exports.deleteMovie = async (req,res) =>{
    let data = await moviedb.findById(req.params.id);

    if(data.movieBanner || data.moviePoster){
        fs.unlinkSync(path.join(__dirname , '..' , data.movieBanner));
        fs.unlinkSync(path.join(__dirname , '..' , data.moviePoster));
    }
    let deleteMovie = await moviedb.findByIdAndDelete(req.params.id);

    return res.redirect('back');
}

module.exports.register = (req,res) =>{
    return res.render('admin_register-pages');
}

module.exports.adminRegister = async (req,res) =>{
  req.body.avatar = '';
    let data = await admindb.create(req.body);

    return res.redirect('back');
}

module.exports.login = async (req,res) =>{
    if(req.isAuthenticated()){
        return res.redirect('/admin');
    }
    return res.render('admin_login-page')
}

module.exports.adminLogin = (req,res) =>{
    return res.redirect('/admin');
}

module.exports.deActive = async (req,res) =>{
    let data = await moviedb.findByIdAndUpdate(req.params.id , {active : false});

    return res.redirect('back')
}

module.exports.active = async (req,res) =>{
    let data = await moviedb.findByIdAndUpdate(req.params.id , {active : true});

    return res.redirect('back')
}

module.exports.adminProfile = async (req,res) =>{
    return res.render('admin-profile');
}

module.exports.updateAdminRecord = async (req, res) => {
    let data = await admindb.findByIdAndUpdate(req.params.id);
  
    return res.render("update_admin", {
      data: data,
    });
  };
  
  module.exports.updateAdmin = async (req, res) => {
    
    if (req.file) {
      let data = await admindb.findById(req.body.uid);
  
      if (data.avatar) {
        fs.unlinkSync(path.join(__dirname, "..", data.avatar));
      }
      req.body.avatar = (await admindb.adminPath) + "/" + req.file.filename;
  
      let imgData = await admindb.findByIdAndUpdate(req.body.uid, req.body);
  
      return res.redirect("back");
    } else {
      let data = await admindb.findByIdAndUpdate(req.body.uid, req.body);
  
      return res.redirect("back");
    }
  };

  module.exports.changePass = async (req, res) => {
    oldPass = await res.locals.user.password;
    pass = await req.body.pass;
    newPass = await req.body.newPass;
    rePass = await req.body.rePass;
  
    if (oldPass == pass) {
      if (pass != newPass) {
        if (newPass == rePass) {
          let data = await admindb.findOneAndUpdate(oldPass, {
            password: req.body.newPass,
          });
  
          return res.redirect("back");
        } else {
          console.log("new password and re password not match");
          return res.redirect("back");
        }
      } else {
        console.log("old password and new password are match");
        return res.redirect("back");
      }
    } else {
      console.log("old password not match");
      return res.redirect("back");
    }
  };

  module.exports.logout = (req, res) => {
    if (req.isAuthenticated()) {
      req.logout((err) => {
        if (err) {
          console.log("not logout");
          return res.redirect("back");
        }
        return res.redirect("/admin/login");
      });
    }
  };