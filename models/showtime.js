import { DataTypes } from 'sequelize'
import sequelize from '../clients/db.sequelize.js'

const Showtime = sequelize.define(
	'Showtime',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		film_id: { type: DataTypes.INTEGER, allowNull: false },
		show_date: { type: DataTypes.DATEONLY, allowNull: false },
		show_time: { type: DataTypes.TIME, allowNull: false },
		price: { type: DataTypes.DECIMAL(10, 2) },
		total_seats: { type: DataTypes.INTEGER, defaultValue: 50 },
		available_seats: { type: DataTypes.INTEGER }
	},
	{ timestamps: false }
)

export default Showtime
