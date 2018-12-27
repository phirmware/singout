var mongoose = require('mongoose');

var playlistSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    short_description:{
        type:String,
        required:true
    },
    long_description:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    views:{
        type:Number,
        default:0
    },
    comments:[]
});

var Playlist = mongoose.model('playlist',playlistSchema);
module.exports = Playlist;