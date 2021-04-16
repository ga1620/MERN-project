const express = require('express');
const router = express.Router();
const AuthSchema = require('../SchemaDb/Auth_schema');

router.get('/:email/:passward',(req,res,next) => {
    AuthSchema.find({email:req.params.email}).exec()
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