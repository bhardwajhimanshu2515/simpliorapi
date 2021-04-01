"use strict"
const bycrypt = require('bcryptjs'); //for hashing
const jwt = require('jsonwebtoken'); //for token generation
const HttpResponse = require('../models/http-response'); //for response with message and code
const Company = require('../models/company');  //companySchema
const UserInfo=require("../models/userInfo"); //userInfoSchema

const signup = async (req, res) => {
  //desctructuring of req.body object  
  const { CompanyName, CompanyEmail, password} = req.body;

  // checking if user already exist or not
  let userExists;
  try {
    userExists = await Company.findOne({ CompanyEmail: CompanyEmail })
  } catch (err) {
    const error = new HttpResponse(
      'Signing up failed, Error in checking existing user',
      500
    );
    return res.status(500).json({ response: error });
  }

  if (userExists) {
    const error = new HttpResponse(
      'User exists already, please signin instead of signup.',
      422
    );
    return res.status(422).json({ response: error });
  }

  //as user is new so create a hashed password and save the user into mongodb.
  let hashPassword;
  try {
    hashPassword = await bycrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpResponse("Hashing Failed ..", 500)
    return res.status(500).json({ response: error });
  }
  const newUser = new Company({
    CompanyName,
    CompanyEmail,
    password: hashPassword
  });
  try {
    await newUser.save();
  } catch (err) {
    console.log(err)
    const error = new HttpResponse(
      err,
      500
    );
    return res.status(500).json({ response: error })
  }

  //as hashing is done generate jsonwebtoken
  let token;
  try {
    token = jwt.sign({email:newUser.email},
      "mySEcrET",
      { expiresIn: '7d' });
  } catch (err) {
    const error = new HttpResponse(
      "Error in token generation",
      500
    );
    return res.status(500).json({ response: error });
  }

  //return response
  let user;
  try{
      user=await (await Company.findOne({_id:newUser._id},"-password"));
  }
  catch(err){
    const error = new HttpResponse(
        "Error in getting user from DB",
        500
      );
      return res.status(500).json({ response: error });
  }
  res.status(201).json(user);
};


// LOGIN FUNCTION
const signin = async (req, res) => {
  //desctructing of req.body object
  const { CompanyEmail, password } = req.body;

  //trying to find if user email exists.
  let userExists;
  try {
    userExists = await Company.findOne({CompanyEmail:CompanyEmail})
  } catch (err) {
    const error = new HttpResponse(
      'Error in checking user email',
      500
    );
    return res.status(500).json({ response: error })
  }

  if (!userExists) {
    const error = new HttpResponse(
      'Invalid credentials, could not log you in.',
      401
    );
    return res.status(500).json({ response: error })
  }

  //check whether password is valid or not
  let isPasswordValid;
  try {
    isPasswordValid = await bycrypt.compare(password,userExists.password);
  } catch (err) {
    const error = new HttpResponse('Something went wrong while comparing passwords', 500);
    return res.status(500).json({ response: error })
  }

  if (!isPasswordValid) {
    const error = new HttpResponse('Wrong password entered', 401);
    return res.status(401).json({ response: error });
  }

  //As password valid so generate token
  let token;
  try {
    token = jwt.sign({email: userExists.email },
      "mySEcrET",
      { expiresIn: '7d' });
  } catch (err) {
    const error = new HttpResponse(
      "Error in generating token",
      500
    );
    return res.status(500).json({ response: error });
  }

//return response
  let user;
  try{
      user=await (await Company.findOne({_id:userExists._id},"-password"));
  }
  catch(err){
    const error = new HttpResponse(
        "Error in getting user from DB",
        500
      );
      return res.status(500).json({ response: error });
  }
  res.status(201).json(user);
};

exports.singup = signup;
exports.signin = signin;