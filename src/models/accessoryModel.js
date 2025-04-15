const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let accessorySchema = new Schema({
    name:{
        type : String,
        required : true,
        unique : true,
    },
    options:{
        type : Array,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    facultatif:{
        type : Boolean,
        required : true
    }
});

module.exports = mongoose.model('Accessory', accessorySchema);