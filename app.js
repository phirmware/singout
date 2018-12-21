var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
let http = require('http');
let server = http.createServer(app);
const passport = require('passport');
let socketIO = require('socket.io');
let path = require('path');
const db = require("./models");
const localStrategy = require("passport-local").Strategy;
// const jwt = require("jsonwebtoken");
const async = require('async');
// const crypto = require('crypto');
const AuthController = {};
var likeRoute = require('./routes/likes');

passport.use(new localStrategy(db.user.authenticate()));
passport.serializeUser(db.user.serializeUser());
passport.deserializeUser(db.user.deserializeUser());
let io = socketIO(server);
app.set('io', io);
io.on('connection', (socket) => {
    console.log('user connected');
});

//use static files
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.use(require('express-session')({
    secret: 'Tmx8Y=fEn!A2KF=5cU2#&UaHMJweeUcTSWN5-6pXTUEHpu?Yhv',
    resave: false,
    saveUninitialized: false
}));

app.use('/api/like',likeRoute);

//secret code password = 'Tmx8Y=fEn!A2KF=5cU2#&UaHMJweeUcTSWN5-6pXTUEHpu?Yhv';

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var line = __dirname + '/views'
app.use(express.static(line))

// root route
app.get('/', (req, res) => {
    db.song.find().then(songs=>{
        res.render('index',{songs:songs});
    });
});

app.get('/signup', (req, res) => {
    res.render('signup', { msg: '' });
});

//user signup
app.post("/signup", (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.redirect('/signup');
    }
    db.user.register(
        new db.user({
            username: req.body.username
        }),
        req.body.password,
        (err, user) => {
            if (err) {
                res.render('signup', { msg: err });
            } else {
                res.redirect('/upload');
            }
        }
    );
});

app.get('/music/:id',(req,res)=>{
    db.song.findById(req.params.id).then(song=>{
        res.render('music',{song:song});
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

//user login
app.post('/login', (req, res, next) => {
    AuthController.login(req, res, next); //Holds the properties in an object before sending the parameters
});
AuthController.login = async (req, res) => {
    //try and catch error to determine look out before and after getting the authentication.
    try {
        if (!req.body.username || !req.body.password) {
            res.redirect('/login');
        }
        passport.authenticate('local', { session: false }, (err, user) => {
            if (err || !user) {
                res.redirect('/login');
            }
            req.login(user, { session: true }, (err) => {
                if (err) {
                    res.send(err);
                }
                res.redirect('/upload');
            });
        })(req, res);
    }
    catch (err) {
        console.log(err);
    }
};

app.get('/upload',isLoggedIn, (req, res) => {
    res.render('upload');
});

// upload image
const multer = require('multer');

// set storage engine
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('song');

//check file type
function checkFileType(file, cb) {
    const fileTypes = /mp3|m4a|oga|mp4/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype)

    if (mimeType && extname) {
        return cb(null, true);
    } else {
        cb('Error:Images Only!');
    }
}

app.post('/upload',isLoggedIn, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.redirect('/upload');
        } else {
            var song = '/uploads/' + req.file.filename
            db.song.create({
                username:req.body.name,
                title:req.body.title,
                genres: req.body.genres.split(','),
                short_description: req.body.short_description,
                long_description : req.body.long_description,
                song: song
            }).then(song=>{
                res.redirect('/music/' + song._id)
            });
            // res.send({ statusText: 'Uploaded Successfully', statusCode: 200 });
        }
    })
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signup');
}


app.get('/songs',(req,res)=>{
   db.song.find().then(songs=>{
       res.render('songs',{songs:songs});
   });
});


//listen 
server.listen(port, () => {
    console.log(`listening at port ${port}`);
});