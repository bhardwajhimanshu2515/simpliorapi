"use strict";
const HttpResponse = require("../models/http-response"); //for response with message and code
const ExperienceInfo = require("../models/experienceInfo"); //experienceInfoSchema

const addExperience = async (req, res) => {
  console.log(req.body);
  let addExperience;
  try{
    addExperience=await ExperienceInfo.insertMany(req.body)
  }
  catch(err){
    console.log(err);
    return res.status(500).json("Error in saving experience")
  }
  let allExperience;
  try{
    allExperience=await ExperienceInfo.find({UserInfoId:req.body[0].UserInfoId});
  }
  catch(err){
    console.log(err)
    return res.status(500).json("Error in getting all experience");
  }
  res.status(200).json(allExperience);
};

const editExperience = async (req, res) => {
    console.log(req.body);
  const {
    ExperienceInfoId,
    UserInfoId,
    Title,
    EmploymentType,
    CompanyName,
    Location,
    StartDate,
    EndDate,
    Headline,
    Description,
  } = req.body;
  let updatedExperienceInfo;
  try {
    updatedExperienceInfo = await ExperienceInfo.findOneAndUpdate(
      { _id: ExperienceInfoId },
      {
        $set: {
          Title: Title,
          EmploymentType: EmploymentType,
          UserInfoId:UserInfoId,
          CompanyName: CompanyName,
          Location: Location,
          StartDate: StartDate,
          EndDate: EndDate,
          Headline: Headline,
          Description: Description,
        },
      },
      {upsert:true,new:true,runValidators:true}
    );
  }
  catch(err){
      console.log(err);
      return res.status(500).json("Error in updation of Experience")
  }
  console.log(updatedExperienceInfo);
  let allExperience;
  try{
    allExperience=await ExperienceInfo.find({UserInfoId:UserInfoId})
  }
  catch(err){
    console.log(err)
    return res.status(500).json("Error in getting all experiences");
  }
  return res.status(200).json(allExperience);
};
exports.addExperience = addExperience;
exports.editExperience = editExperience;
