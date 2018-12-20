var mongoose = require('mongoose');
var express = require('express');

var songSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    title:{
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
    song:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    genres:Array
});

var Song = mongoose.model('songs',songSchema);
module.exports = Song;