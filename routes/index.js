import express from 'express'
import authRoutes from './auth.js'
import adminRoutes from './admin.js'
import bookRoutes from './bookings.js'
import commentRoutes from './comment.js'
import filmsRoutes from './films.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)

export default router
