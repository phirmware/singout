var mongoose = require('mongoose');
var config = require('../config');

mongoose.set('debug',true);
mongoose.connect(config.DB, { useNewUrlParser: true });

mongoose.Promise = Promise;

module.exports.user = require('./user');
module.exports.song = require('./song');
module.exports.playlist = require('./playlist');
module.exports.request = require('./request');