const express = require('express');
const router = express.Router();
const controller = require('../controller/adminController');
const { requireAuth } = require('../middleware/authMiddleware')

router.get('/get_auth', controller.checkAdminAuth)
router.post('/auth', controller.adminLogin);
router.get('/logout', controller.adminLogout);
router.get('/create',requireAuth, controller.createUser);
router.get('/users/all', requireAuth, controller.getAllUsers);
router.get('/users/edit/:id', requireAuth, controller.editUser);
router.get('/users/delete/:id', requireAuth, controller.deleteUser);

module.exports = router;



