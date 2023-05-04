const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
    selectedSeats : {
        type : Array,
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    time : {
        type : String,
        required : true,
    },
    showid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'movieShow',
        required : true,
    }
})

const seat = mongoose.model('bookSeat', seatSchema)
module.exports = seat;