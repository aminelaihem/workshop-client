const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let consoleModel = new Schema({
    name:{
        type : String,
        required : true,
        unique : true,
    },
    price:{
        type : Number,
        required : true
    },
});

module.exports = mongoose.model('Console', consoleModel);