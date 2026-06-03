import Joi from 'joi'
import jwt from 'jsonwebtoken'
import md5 from 'md5'
import { User } from '../models/index.js'

const registerSchema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	full_name: Joi.string().allow('')
})

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
})

export async function register(req, res) {
	try {
		const { error, value } = registerSchema.validate(req.body)
		if (error)
			return res.status(400).json({ message: error.details[0].message })

		const existing = await User.findOne({ where: { email: value.email } })
		if (existing)
			return res.status(400).json({ message: 'Email already in use' })

		const user = await User.create({
			username: value.username,
			email: value.email,
			password: md5(value.password),
			full_name: value.full_name || '',
			role: 'user'
		})

		res
			.status(201)
			.json({ message: 'Registered successfully', userId: user.id })
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function login(req, res) {
	try {
		const { error, value } = loginSchema.validate(req.body)
		if (error)
			return res.status(400).json({ message: error.details[0].message })

		const user = await User.findOne({ where: { email: value.email } })
		if (!user)
			return res.status(401).json({ message: 'Invalid email or password' })

		if (user.password !== md5(value.password))
			return res.status(401).json({ message: 'Invalid email or password' })

		const token = jwt.sign(
			{ id: user.id, email: user.email, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: '24h' }
		)

		res.cookie('token', token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		})

		res.json({
			message: 'Logged in',
			user: { id: user.id, email: user.email, role: user.role }
		})
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

export async function logout(req, res) {
	res.clearCookie('token')
	res.json({ message: 'Logged out' })
}

export async function changePassword(req, res) {
	try {
		const { oldPassword, newPassword } = req.body
		if (!newPassword || newPassword.length < 6)
			return res
				.status(400)
				.json({ message: 'New password must be at least 6 characters' })

		const user = await User.findByPk(req.user.id)
		if (user.password !== md5(oldPassword))
			return res.status(401).json({ message: 'Old password is incorrect' })

		await user.update({ password: md5(newPassword) })
		res.json({ message: 'Password changed successfully' })
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}
