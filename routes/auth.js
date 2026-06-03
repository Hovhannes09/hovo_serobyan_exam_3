import express from 'express'
import {
	register,
	login,
	changePassword
} from '../controllers/authController.js'
import authorization from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.put('/change-password', authorization, changePassword)

export default router
