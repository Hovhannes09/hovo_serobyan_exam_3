import express from 'express'

const router = express.Router()

router.get('/users', authenticateToken, getAllUsers)
router.delete('/users/:id', authenticateToken, deleteUser)

export default router
