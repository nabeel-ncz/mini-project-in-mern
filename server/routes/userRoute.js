const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');
const upload = require('../config/multer');

router.get('/user',(req, res) => {
    res.json({status:'ok'})
})
router.get('/user/get/:id', controller.getUser);
router.get('/user/get_auth', controller.checkUserAuth);
router.post('/user/register',upload.single('file'),controller.registerUser);
router.post('/user/update/:id',upload.single('file'),controller.updateUser);
router.post('/user/login',controller.loginUser);
router.get('/user/logout',controller.logoutUser);

module.exports = router;