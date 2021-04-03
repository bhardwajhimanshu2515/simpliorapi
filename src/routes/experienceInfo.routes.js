const express = require('express');
const checkToken = require('../middlewares/checkToken')

const experienceInfoController = require("../controllers/experienceInfo.controllers");

const router = express.Router();

//all the api written below this will require a token
router.use(checkToken);

router.post('/addExperience',experienceInfoController.addExperience);

module.exports = router;