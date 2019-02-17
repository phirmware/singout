var mongoose = require('mongoose');

var requestSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    song:{
        type:String,
        required:true
    }
});

var Request = mongoose.model('Request',requestSchema);

module.exports = Request;