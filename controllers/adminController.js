import { Booking, Showtime, Film, User, Comment } from '../models/index.js'
import { Op } from 'sequelize'
import sequelize from '../clients/db.sequelize.js'

export async function getAllBookings(req, res) {
	try {
		const page = parseInt(req.query.page) || 1
		const limit = 20
		const offset = (page - 1) * limit

		const { count, rows } = await Booking.findAndCountAll({
			include: [
				{ model: User, attributes: ['username', 'email'] },
				{ model: Showtime, include: [Film] }
			],
			limit,
			offset,
			order: [['booking_date', 'DESC']]
		})

		res.json({
			bookings: rows,
			total: count,
			page,
			totalPages: Math.ceil(count / limit)
		})
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function createShowtime(req, res) {
	try {
		const { film_id, show_date, show_time, price, total_seats } = req.body

		const count = await Showtime.count({ where: { film_id, show_date } })
		if (count >= 3)
			return res
				.status(400)
				.json({ message: 'Maximum 3 showtimes per film per day' })

		const showtime = await Showtime.create({
			film_id,
			show_date,
			show_time,
			price,
			total_seats: total_seats || 50,
			available_seats: total_seats || 50
		})

		res.status(201).json(showtime)
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function moderateComment(req, res) {
	try {
		const comment = await Comment.findByPk(req.params.id)
		if (!comment) return res.status(404).json({ message: 'Comment not found' })

		const { status } = req.body
		if (!['approved', 'rejected'].includes(status))
			return res.status(400).json({ message: 'Invalid status' })

		await comment.update({ status })
		res.json({ message: `Comment ${status}` })
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function getTopFilms(req, res) {
	try {
		const films = await Film.findAll({
			include: [
				{
					model: Showtime,
					include: [{ model: Booking, attributes: [] }],
					attributes: []
				}
			],
			attributes: [
				'id',
				'title',
				[
					sequelize.fn('COUNT', sequelize.col('Showtimes->Bookings.id')),
					'total_bookings'
				],
				[
					sequelize.fn('SUM', sequelize.col('Showtimes->Bookings.total_price')),
					'revenue'
				]
			],
			group: ['Film.id'],
			order: [[sequelize.literal('total_bookings'), 'DESC']]
		})
		res.json(films)
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}
