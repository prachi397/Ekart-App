const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use(require('./router/auth'));
// const User = require('./model/userSchema');

const PORT = process.env.PORT;

const middleware = (req,res, next) => {
    console.log(`Hello my Middleware`);
    next();
}

app.use(middleware);

app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`);
})