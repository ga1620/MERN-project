const express = require('express');
const router = express.Router();
const PostSchema = require('../SchemaDb/Post_schema');
const mongoose = require('mongoose');


router.put('/comment',(req,res,next) => {
   PostSchema.updateOne({_id:req.body.postid},{$push : {
       comment:{
          commentuser:{
              username:req.body.username,
              profile:req.body.profile
          },
          commentdata:req.body.comm
       }
   }}).exec()
   .then(resu => {
       res.status(200).json({
           message:"Sucessfully comment post"
       })
   })
   .catch(err => {
       res.status(400).json({
           error:err.message
       })
   })
})

router.get('/',(req,res,next) => {
    PostSchema.find().populate('userid').exec()
    .then(result => {
        res.status(200).json({
            result
        })
    })
    .catch(err => {
        res.status(400).json({
            error:err.message
        })
    })
})

module.exports = router;