import express from 'express'
import {
	getAllBookings,
	createShowtime,
	moderateComment,
	getTopFilms
} from '../controllers/adminController.js'
import authorization from '../middlewares/auth.js'
import { isAdmin } from '../middlewares/auth.js'

const router = express.Router()

router.use(authorization, isAdmin)

router.get('/bookings', getAllBookings)
router.post('/showtimes', createShowtime)
router.put('/comments/:id/moderate', moderateComment)
router.get('/reports/top-films', getTopFilms)

export default router
