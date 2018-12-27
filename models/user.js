var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    artist:{
        type:Boolean,
        default:false
    },
    full_name:{
        type:String,
        default:''
    },
    stage_name:{
        type:String,
        default:''
    },
    short_description:{
        type:String,
        default:''
    },
    thumbnail:{
        type:String,
        default:'images/artist.jpg'
    },
    catch_phrase:{
        type:String,
        default:''
    },
    likes:{
        type:Number,
        default:0
    },
    views:{
        type:Number,
        default:0
    }
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('user', userSchema);
module.exports = User;