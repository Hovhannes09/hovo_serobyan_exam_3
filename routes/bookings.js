import express from 'express'
import {
	createBooking,
	getMyBookings,
	getBooking,
	cancelBooking
} from '../controllers/bookingController.js'
import authorization from '../middlewares/auth.js'

const router = express.Router()

router.get('/', authorization, getMyBookings)
router.get('/:id', authorization, getBooking)
router.post('/', authorization, createBooking)
router.put('/:id/cancel', authorization, cancelBooking)

export default router
