const express = require("express");
const router = express.Router();
const db = require("../models");

router.post('/comment/:id',(req,res)=>{
    const io = req.app.get('io');
    db.playlist.findById(req.params.id).then(playlist=>{
        playlist.comments.push(req.body.comment)
        playlist.save().then(() => {
            io.emit('newcomment');
        });
        res.json({statusCode:200});
    }).catch(()=>{
        res.json({statusCode:400});
    });
});

router.get('/comment/:id',(req,res)=>{
    db.playlist.findById(req.params.id).then(playlist=>{
        res.json(playlist.comments);
    });
});

module.exports = router;