const express = require('express');
const router = express.Router();
const {
  register,
  login,
  dashboard
const authController = require('../controllers/authController');

const auth = require("../middleware/authMiddleware");

router.get("/dashboard", auth, authController.dashboard);

router.post('/register', register);
router.post('/login', login);

module.exports = router;
