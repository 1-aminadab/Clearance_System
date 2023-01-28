const express = require('express')
const router = express.Router()

const {
    register,
    login,
    getStudent
} = require('../controllers/students')

router.post('/register',register)
router.get('/register:id',getStudent)
router.post('/login',login)

module.exports = router