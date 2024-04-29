// routes/userRoutes.js
const express = require('express');
const UserController=require('../controller/userController')
const router = express.Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;
