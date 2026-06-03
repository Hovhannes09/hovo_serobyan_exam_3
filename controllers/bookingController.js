import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { Booking, Showtime, Film, User } from '../models/index.js'

export async function createBooking(req, res) {
	try {
		const { showtime_id, seats } = req.body
		const seatsArray = seats.split(',').map(s => s.trim())

		if (seatsArray.length > 6)
			return res.status(400).json({ message: 'Maximum 6 seats per booking' })

		const showtime = await Showtime.findByPk(showtime_id)
		if (!showtime)
			return res.status(404).json({ message: 'Showtime not found' })

		if (showtime.available_seats < seatsArray.length)
			return res.status(400).json({ message: 'Not enough available seats' })

		const total_price = showtime.price * seatsArray.length

		const booking = await Booking.create({
			user_id: req.user.id,
			showtime_id,
			seats,
			total_price,
			booking_reference: uuidv4(),
			booking_date: new Date(),
			status: 'confirmed'
		})

		await showtime.update({
			available_seats: showtime.available_seats - seatsArray.length
		})

		res.status(201).json(booking)
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function getMyBookings(req, res) {
	try {
		const page = parseInt(req.query.page) || 1
		const limit = 10
		const offset = (page - 1) * limit

		const { count, rows } = await Booking.findAndCountAll({
			where: { user_id: req.user.id },
			include: [{ model: Showtime, include: [Film] }],
			limit,
			offset,
			order: [['booking_date', 'DESC']]
		})

		const bookings = rows.map(b => ({
			...b.toJSON(),
			booking_date: moment(b.booking_date).format('DD MMM YYYY HH:mm')
		}))

		res.json({
			bookings,
			total: count,
			page,
			totalPages: Math.ceil(count / limit)
		})
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function getBooking(req, res) {
	try {
		const booking = await Booking.findOne({
			where: { id: req.params.id, user_id: req.user.id },
			include: [{ model: Showtime, include: [Film] }]
		})
		if (!booking) return res.status(404).json({ message: 'Booking not found' })
		res.json(booking)
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function cancelBooking(req, res) {
	try {
		const booking = await Booking.findOne({
			where: { id: req.params.id, user_id: req.user.id }
		})
		if (!booking) return res.status(404).json({ message: 'Booking not found' })
		if (booking.status === 'cancelled')
			return res.status(400).json({ message: 'Already cancelled' })

		const showtime = await Showtime.findByPk(booking.showtime_id)
		const seatsCount = booking.seats.split(',').length
		await showtime.update({
			available_seats: showtime.available_seats + seatsCount
		})
		await booking.update({ status: 'cancelled' })

		res.json({ message: 'Booking cancelled' })
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}
