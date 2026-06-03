import moment from 'moment'
import { Comment, User, Film, Booking, Showtime } from '../models/index.js'

export async function getComments(req, res) {
	try {
		const page = parseInt(req.query.page) || 1
		const limit = 10
		const offset = (page - 1) * limit
		const order = req.query.order || 'newest'

		const orderMap = {
			newest: [['createdAt', 'DESC']],
			oldest: [['createdAt', 'ASC']],
			highest: [['rating', 'DESC']],
			lowest: [['rating', 'ASC']]
		}

		const { count, rows } = await Comment.findAndCountAll({
			where: { film_id: req.params.filmId, status: 'approved' },
			include: [{ model: User, attributes: ['username'] }],
			limit,
			offset,
			order: orderMap[order] || orderMap.newest
		})

		res.json({
			comments: rows,
			total: count,
			page,
			totalPages: Math.ceil(count / limit)
		})
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function createComment(req, res) {
	try {
		const film_id = parseInt(req.params.filmId)
		const { comment_text, rating } = req.body

		if (comment_text && comment_text.length > 500)
			return res
				.status(400)
				.json({ message: 'Comment must be 500 characters or less' })

		const hasSeen = await Booking.findOne({
			where: { user_id: req.user.id, status: 'confirmed' },
			include: [{ model: Showtime, where: { film_id } }]
		})
		if (!hasSeen)
			return res
				.status(403)
				.json({ message: 'You can only review films you have booked' })

		const existing = await Comment.findOne({
			where: { user_id: req.user.id, film_id }
		})
		if (existing)
			return res.status(400).json({ message: 'You already reviewed this film' })

		const comment = await Comment.create({
			user_id: req.user.id,
			film_id,
			comment_text,
			rating,
			status: 'pending'
		})

		res.status(201).json(comment)
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function updateComment(req, res) {
	try {
		const comment = await Comment.findOne({
			where: { id: req.params.id, user_id: req.user.id }
		})
		if (!comment) return res.status(404).json({ message: 'Comment not found' })

		const hoursElapsed = moment().diff(moment(comment.createdAt), 'hours')
		if (hoursElapsed >= 24)
			return res.status(403).json({ message: 'Cannot edit after 24 hours' })

		await comment.update({
			comment_text: req.body.comment_text,
			rating: req.body.rating
		})
		res.json(comment)
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function deleteComment(req, res) {
	try {
		const comment = await Comment.findOne({
			where: { id: req.params.id, user_id: req.user.id }
		})
		if (!comment) return res.status(404).json({ message: 'Comment not found' })
		await comment.update({ status: 'deleted' })
		res.json({ message: 'Comment deleted' })
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}
