const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const controller = require('../controllers/studentController')
const auth = require("../middleware/authMiddleware");

router.get("/dashboard", auth, authController.dashboard);


router.get('/', auth, controller.getStudents)
router.post('/', auth, controller.addStudent)
router.put('/:id', auth, controller.updateStudent)
router.delete('/:id', auth, controller.deleteStudent)

module.exports = router
