const mongoose = require('mongoose');

const showSchema =mongoose.Schema({
    theaterid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'theater',
        required : true,
    },
    movieid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'movie datas',
        required : true,
    },
    date : {
        type : String,
        required: true,
    },
    time : {
        type : Array,
        required: true,
    },
});

const show = mongoose.model('movieShow', showSchema);
module.exports = show;