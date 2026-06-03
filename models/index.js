import User from './user.js'
import Film from './film.js'
import Showtime from './showtime.js'
import Booking from './booking.js'
import Comment from './comment.js'

Film.hasMany(Showtime, { foreignKey: 'film_id', onDelete: 'CASCADE' })
Showtime.belongsTo(Film, { foreignKey: 'film_id' })

Showtime.hasMany(Booking, { foreignKey: 'showtime_id', onDelete: 'CASCADE' })
Booking.belongsTo(Showtime, { foreignKey: 'showtime_id' })

User.hasMany(Booking, { foreignKey: 'user_id' })
Booking.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Comment, { foreignKey: 'user_id' })
Comment.belongsTo(User, { foreignKey: 'user_id' })

Film.hasMany(Comment, { foreignKey: 'film_id' })
Comment.belongsTo(Film, { foreignKey: 'film_id' })

export { User, Film, Showtime, Booking, Comment }
