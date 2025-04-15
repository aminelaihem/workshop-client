const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    name:{
        type : String,
        required : true,
        unique : true,
    },
    attributes:{
        type : Array,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
});

module.exports = mongoose.model('Product', productSchema);