const express = require('express')
const router = express.Router()

const { register, login, dashboard } = require('../controllers/authController')
const auth = require('../middleware/authMiddleware')

router.post('/register', register)
router.post('/login', login)
router.get('/dashboard', auth, dashboard)

module.exports = router
