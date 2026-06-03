import express from 'express'
import {
	getFilms,
	getFilm,
	createFilm,
	updateFilm,
	deleteFilm
} from '../controllers/filmController.js'
import authorization from '../middlewares/auth.js'
import { isAdmin } from '../middlewares/auth.js'

const router = express.Router()

router.get('/', getFilms)
router.get('/:id', getFilm)
router.post('/', authorization, isAdmin, createFilm)
router.put('/:id', authorization, isAdmin, updateFilm)
router.delete('/:id', authorization, isAdmin, deleteFilm)

export default router
