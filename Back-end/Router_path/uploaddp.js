const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Authschema = require('../SchemaDb/Auth_schema');
//import {xx} from '../../../React/BACKEND_MONGODB/Project/Uploadimage'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../React/BACKEND_MONGODB/Project/src/uploadedimage');
      },
    filename:(req,file,cb) => {
     cb(null,file.size + '-' + Date.now()+file.originalname);
    }
});


const upload = multer({
    storage:storage
})

router.put('/',upload.single('file'),(req,res,next) => {
   Authschema.updateOne({_id:req.body._id},{$set:{profile:req.file.filename}}).exec()
   .then(result => {
       res.status(200).json({
           message:"File post sucessfully"
       })
   })
   .catch(err => {
       res.status(400).json({
           error:err.message
       })
   })
})


module.exports=router;