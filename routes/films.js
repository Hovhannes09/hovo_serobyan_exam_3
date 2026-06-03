import express from 'express'

const router = express.Router()

router.get('/films', getAllFilms)
router.get('/films/:id', getFilmById)
router.post('/films', createFilm)
router.put('/films/:id', updateFilm)
router.delete('/films/:id', deleteFilm)

export default router
