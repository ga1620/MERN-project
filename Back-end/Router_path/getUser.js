const express = require('express');
const router = express.Router();
const AuthSchema = require('../SchemaDb/Auth_schema');

router.get('/:id',(req,res,next) => {
    AuthSchema.find({_id:req.params.id}).exec()
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

router.get('/',(req,res,next) => {
    AuthSchema.find().exec().then(result => {
        res.status(200).json({
            result
        });
    })
    .catch(err => {
        res.status(200).json({
            error:err.message
        })
    })
})

module.exports = router;