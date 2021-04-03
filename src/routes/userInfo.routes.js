const express = require('express');
const checkToken = require('../middlewares/checkToken')

const userInfoController = require("../controllers/userInfo.controllers");

const router = express.Router();

//all the api written below this will require a token
router.use(checkToken);

router.post('/addEdit',userInfoController.editInfo);

module.exports = router;