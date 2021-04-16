const express = require('express');
const router = express.Router();
const AuthSchema = require('../SchemaDb/Auth_schema');

router.post('/:email/:passward/:username',(req,res,next) => {
   AuthSchema.find({email:req.params.email}).exec()
      .then(result => {
          if(result.length === 0)
          {
            const userData = new AuthSchema({
                email:req.params.email,
                passward:req.params.passward,
                username:req.params.username
            })
            userData.save().then(data => {
                res.status(200).json({
                    message:"Sucessfuly signin into system",
                    data:{
                        email :data.email,
                        passward:data.passward
                    }
                });
            })
            .catch(err => {
                res.status(400).json({
                    error:err.message
                })
                console.log("Unsucess to store user data");
            })
          }
          else{
             return  res.status(404).json({
                  message:"User alredy found"
              })
          }
      })
      .catch(err => {
          res.status(400).json({
              error:err.message
          })
      })
})


module.exports = router;