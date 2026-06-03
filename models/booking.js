import { DataTypes } from 'sequelize'
import sequelize from '../clients/db.sequelize.js'

const Booking = sequelize.define(
	'Booking',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_id: { type: DataTypes.INTEGER, allowNull: false },
		showtime_id: { type: DataTypes.INTEGER, allowNull: false },
		seats: { type: DataTypes.STRING },
		total_price: { type: DataTypes.DECIMAL(10, 2) },
		booking_reference: { type: DataTypes.STRING, unique: true },
		booking_date: { type: DataTypes.DATE },
		status: {
			type: DataTypes.ENUM('confirmed', 'cancelled'),
			defaultValue: 'confirmed'
		}
	},
	{ timestamps: false }
)

export default Booking
