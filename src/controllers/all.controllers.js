"use strict"

const HttpResponse = require('../models/http-response'); //for response with message and code
const Company = require('../models/company');  //companySchema
const UserInfo = require("../models/userInfo"); //userInfoSchema
const ExperienceInfo = require("../models/experienceInfo"); //experienceInfoSchema

const allInfo=async(req,res)=>{
    console.log(req.params.CompanyId);;
    let basicDetails;
    try{
        basicDetails=await UserInfo.findOne({CompanyId:req.params.CompanyId})
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Error in getting basic details")
    }
    let experienceDetails;
    try{
        experienceDetails=await ExperienceInfo.find({UserInfoId:basicDetails._id})
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Error in getting all experience")
    }

    return res.status(200).json({details:basicDetails,experience:experienceDetails});
}


exports.allInfo=allInfo;