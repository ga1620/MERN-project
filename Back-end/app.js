const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const login = require('./Router_path/login');
const signin = require('./Router_path/signin');
const postin = require('./Router_path/comm_get_post');
const uploaddp = require('./Router_path/uploaddp');
const uploadpost = require('./Router_path/uploadPost');
const getUser = require('./Router_path/getUser');
const cors = require('cors');

app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/BasicAuthentication',{useNewUrlParser:true,useUnifiedTopology:true})

app.use(cors());
app.use('/login',login);
app.use('/signin',signin);
app.use('/post',postin);
app.use('/uploaddp',uploaddp);
app.use('/uploadpost',uploadpost);
app.use('/getuser',getUser);

app.use((req,res,next) => {
    res.status(404).json({
        error:"Invalid path"
    })
})

module.exports = app;