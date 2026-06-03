import HttpError from 'http-errors'
import jwt from 'jsonwebtoken'

export default function authorization(req, res, next) {
	try {
		const token = req.cookies?.token
		if (!token) throw HttpError(401, 'No token provided')

		const payload = jwt.verify(token, process.env.JWT_SECRET)
		req.user = payload
		next()
	} catch (e) {
		next(HttpError(401, 'Invalid or expired token'))
	}
}

export function isAdmin(req, res, next) {
	if (req.user?.role !== 'admin') {
		return next(HttpError(403, 'Admin access required'))
	}
	next()
}
