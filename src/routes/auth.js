const express = require('express');
const router = express.Router();
const {
  register,
  login,
  dashboard
} = require('../controllers/authController');

const auth = require("../middleware/authMiddleware");

router.get("/dashboard", auth.dashboard);

router.post('/register', register);
router.post('/login', login);

module.exports = router;
