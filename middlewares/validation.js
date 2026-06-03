import _ from 'lodash'
import HttpError from 'http-errors'

const validator =
	(schema, path = 'body') =>
	(req, res, next) => {
		try {
			const v = schema.validate(req[path] || {}, { abortEarly: false })

			if (v.error) {
				const errors = {}
				v.error.details.forEach(d => {
					const errorMessage = d.message.replace(/".*"/, '').trim()
					_.set(errors, d.path, errorMessage)
				})
				throw HttpError(422, 'Validation error')
			}

			next()
		} catch (e) {
			next(e)
		}
	}

export default validator
