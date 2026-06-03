import express from 'express'

const router = express.Router()

router.get('/users', getAllUsers)
router.delete('/users/:id', deleteUser)

export default router
