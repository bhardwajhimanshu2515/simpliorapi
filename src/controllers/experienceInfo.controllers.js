"use strict";
const HttpResponse = require("../models/http-response"); //for response with message and code
const experienceInfo = require("../models/experienceInfo"); //experienceInfoSchema

const addExperience = async (req, res) => {
  console.log(req.body);
  let result = [];
  for (let i = 0; i < req.body.length; i++) {
    let experience = new experienceInfo({
      UserInfoId: req.body[i].UserInfoId,
      Title: req.body[i].Title,
      EmploymentType: req.body[i].EmploymentType,
      CompanyName: req.body[i].CompanyName,
      Location: req.body[i].Location,
      StartDate: req.body[i].StartDate,
      EndDate: req.body[i].EndDate,
      Headline: req.body[i].Headline,
      Description: req.body[i].Description,
    });
    try {
      await experience.save;
    } catch (err) {
      console.log(err);
      return res.status(500).json("Error in saving experience");
    }
    result.push(experience);
  }

  res.status(200).json(result);
};

const editExperience = async (req, res) => {
    console.log(req.body);
  const {
    ExperienceInfoId,
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
    updatedExperienceInfo = await experienceInfo.findOneAndUpdate(
      { _id: ExperienceInfoId },
      {
        $set: {
          Title: Title,
          EmploymentType: EmploymentType,
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
  res.status(200).json(updatedExperienceInfo);
};
exports.addExperience = addExperience;
exports.editExperience = editExperience;
