import express from 'express'
import {
	getComments,
	createComment,
	updateComment,
	deleteComment
} from '../controllers/commentController.js'
import authorization from '../middlewares/auth.js'

const router = express.Router()

router.get('/:filmId/comments', getComments)
router.post('/:filmId/comments', authorization, createComment)
router.put('/comments/:id', authorization, updateComment)
router.delete('/comments/:id', authorization, deleteComment)

export default router
