const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/movieShow');

const db = mongoose.connection;

db.once('open', (err)=>{
    if(err){
        console.log('database not connected');
        return false;
    }
    console.log('database is connected');
});

module.exports = db;