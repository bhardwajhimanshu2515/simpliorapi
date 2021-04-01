//import express
const express = require('express');

//import express validator to validate requests
const { check } = require('express-validator');

//import authorization controllers
const authorizationController = require("../controllers/authorzation.controllers");

//create router
const router = express.Router();

//router for /signup
router.post('/signup',  
[
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 8 })
  ],
  authorizationController.singup);

//router for /signin
router.post('/signin', authorizationController.signin);

//export router
module.exports = router;