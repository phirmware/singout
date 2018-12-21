const express = require("express");
const router = express.Router();
const db = require("../models");

router.get('/:id',(req,res)=>{
    const io = req.app.get('io');
    db.song.findById(req.params.id).then(song=>{
        song.likes = song.likes + 1;
        song.save().then(() => {
            io.emit('newlike');
        });
        res.json({statusCode:200});
    }).catch(err=>{
        res.json({err:404});
    });
});

router.get('/:id/likes',(req,res)=>{
    db.song.findById(req.params.id).then(song=>{
        res.json({likes:song.likes});
    });
});

router.get('/:id/views',(req,res)=>{
    db.song.findById(req.params.id).then(song=>{
        res.json({views:song.views});
    });
})

module.exports = router;