import express from 'express'
import {
	createShowtime,
	getAllBookings,
	getTopFilms,
	moderateComment
} from '../controllers/adminController.js'
import authorization, { isAdmin } from '../middlewares/auth.js'

const router = express.Router()

router.use(authorization, isAdmin)

router.get('/bookings', getAllBookings)
router.post('/showtimes', createShowtime)
router.put('/comments/:id/moderate', moderateComment)
router.get('/reports/top-films', getTopFilms)

export default router
