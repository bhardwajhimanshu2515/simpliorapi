"use strict"

const HttpResponse = require('../models/http-response'); //for response with message and code
const Company = require('../models/company');  //companySchema
const UserInfo = require("../models/userInfo"); //userInfoSchema
const ExperienceInfo = require("../models/experienceInfo"); //experienceInfoSchema

const allBasicInfo=async(req,res)=>{
    console.log(req.params.CompanyId);;
    let basicDetails;
    try{
        basicDetails=await UserInfo.findOne({CompanyId:req.params.CompanyId})
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Error in getting basic details")
    }
    return res.status(200).json(basicDetails);
}

const allExperienceInfo=async(req,res)=>{
    console.log(req.params.UserInfoId);
    let experienceDetails;
    try{
        experienceDetails=await ExperienceInfo.find({UserInfoId:req.params.UserInfoId})
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Error in getting experience details")
    }
    return res.status(200).json(experienceDetails);
}

exports.allBasicInfo=allBasicInfo;
exports.allExperienceInfo=allExperienceInfo;