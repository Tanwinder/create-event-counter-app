const express = require('express');
const {signin, signup, refreshtoken, logout} = require('../controllers/user');

const router = express.Router();


router.post("/signin", signin);
router.post("/signup", signup);
router.post("/refreshtoken", refreshtoken);
router.post("/logout", logout);


module.exports = router;