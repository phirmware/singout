const express = require("express");
const router = express.Router();
const db = require("../models");

router.get('/:id',(req,res)=>{
    db.song.findById(req.params.id).then(song=>{
        song.likes = song.likes + 1;
        song.save();
        res.json({statusCode:200});
    }).catch(err=>{
        res.json({err:404});
    })
})

module.exports = router;