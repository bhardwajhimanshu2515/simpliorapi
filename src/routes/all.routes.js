const express = require('express');
const checkToken = require('../middlewares/checkToken')

const allController = require("../controllers/all.controllers");

const router = express.Router();

//all the api written below this will require a token
router.use(checkToken);

router.get('/allBasicInfo/:CompanyId',allController.allBasicInfo);
router.get('/allExperienceInfo/:UserInfoId',allController.allExperienceInfo);

module.exports = router;