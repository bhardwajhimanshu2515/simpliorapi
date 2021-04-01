//import express mongoose body-parser and cors
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require("cors");

//import routes here
const authorizationRoutes = require('./src/routes/authorization.routes');

//create server
const app = express();

//use middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//using routes i.e. middlewares
app.use('/api/userAuth',authorizationRoutes);

// DbURL here
var dbURL = "mongodb://127.0.0.1:27017/simpliorDatabase";

mongoose
  .connect(dbURL,
    {
      useUnifiedTopology: true, 
      useNewUrlParser:true, useCreateIndex: true,  useFindAndModify: false 
    })
  .then(() => {
    console.log("Connected to Database")
    app.listen(process.env.PORT || 8081,()=>{
        console.log("Server Started.......")
    });
  })
  .catch(err => {
    console.log(err);
  });