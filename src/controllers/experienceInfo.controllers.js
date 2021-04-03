"use strict";
const HttpResponse = require("../models/http-response"); //for response with message and code
const experienceInfo = require("../models/experienceInfo"); //experienceInfoSchema

const addExperience=async(req,res)=>{
    console.log(req.body);
    let result=[];
    for(let i=0;i<req.body.length;i++){
        let experience=new experienceInfo({
            UserInfoId:req.body[i].UserInfoId,
            Title:req.body[i].Title,
            EmploymentType:req.body[i].EmploymentType,
            CompanyName:req.body[i].CompanyName,
            Location:req.body[i].Location,
            StartDate:req.body[i].StartDate,
            EndDate:req.body[i].EndDate,
            Headline:req.body[i].Headline,
            Description:req.body[i].Description
        });
        try{
            await experience.save;
        }
        catch(err){
            console.log(err);
            return res.status(500).json("Error in saving experience")
        }
        result.push(experience);
    }

    res.status(200).json(result)
}

exports.addExperience=addExperience;