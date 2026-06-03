import express from 'express'
import authRoutes from './auth.js'
import filmRoutes from './films.js'
import bookingRoutes from './bookings.js'
import commentRoutes from './comment.js'
import adminRoutes from './admin.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/films', filmRoutes)
router.use('/bookings', bookingRoutes)
router.use('/films', commentRoutes)
router.use('/admin', adminRoutes)

export default router
