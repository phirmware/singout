var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);


var User = mongoose.model('user', userSchema);
module.exports = User;