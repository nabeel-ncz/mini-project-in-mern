const express = require('express');
const router = express.Router();
const controller = require('../controller/adminController');
const { requireAuth } = require('../middleware/authMiddleware')
const upload = require('../config/multer');

router.get('/get_auth', controller.checkAdminAuth)
router.post('/auth', controller.adminLogin);
router.get('/logout', controller.adminLogout);
router.get('/users/all', requireAuth, controller.getAllUsers);
router.post('/create',requireAuth, upload.single('file'), controller.createUser);
router.get('/users/edit/:id', requireAuth, controller.getEditUserData);
router.put('/users/edit/:id', requireAuth,upload.single('file'), controller.editUser);
router.delete('/users/delete/:id', requireAuth, controller.deleteUser);

module.exports = router;



