const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Postschema = require('../SchemaDb/Post_schema');


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

router.post('/',upload.single('file'),(req,res,next) => {
   const postSchema = new Postschema({
       image:req.file.filename,
       userid:req.body.id,
       disc:req.body.disc
   })

   postSchema.save()
   .then(result => {
       res.status(200).json({
           message:"sucessfully"
       });
   })
   .catch(err => {
       res.status(404).json({
           error:err.message
       })
   })
})


module.exports=router;