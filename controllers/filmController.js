import { Op } from 'sequelize'
import { Film, Booking, Showtime } from '../models/index.js'

export async function getFilms(req, res) {
	try {
		const page = parseInt(req.query.page) || 1
		const limit = 10
		const offset = (page - 1) * limit
		const search = req.query.search || ''

		const where = search ? { title: { [Op.like]: `%${search}%` } } : {}

		const { count, rows } = await Film.findAndCountAll({
			where,
			limit,
			offset,
			order: [['id', 'DESC']]
		})

		res.json({
			films: rows,
			total: count,
			page,
			totalPages: Math.ceil(count / limit)
		})
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function getFilm(req, res) {
	try {
		const film = await Film.findByPk(req.params.id)
		if (!film) return res.status(404).json({ message: 'Film not found' })
		res.json(film)
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function createFilm(req, res) {
	try {
		const { title, description, genre, duration } = req.body
		if (!title) return res.status(400).json({ message: 'Title is required' })
		const film = await Film.create({ title, description, genre, duration })
		res.status(201).json(film)
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function updateFilm(req, res) {
	try {
		const film = await Film.findByPk(req.params.id)
		if (!film) return res.status(404).json({ message: 'Film not found' })
		await film.update(req.body)
		res.json(film)
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function deleteFilm(req, res) {
	try {
		const film = await Film.findByPk(req.params.id)
		if (!film) return res.status(404).json({ message: 'Film not found' })

		const bookings = await Booking.count({
			include: [{ model: Showtime, where: { film_id: film.id } }]
		})
		if (bookings > 0)
			return res
				.status(400)
				.json({ message: 'Cannot delete film with existing bookings' })

		await film.destroy()
		res.json({ message: 'Film deleted' })
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}
