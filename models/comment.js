import { DataTypes } from 'sequelize'
import sequelize from '../clients/db.sequelize.js'

const Comment = sequelize.define(
	'Comment',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_id: { type: DataTypes.INTEGER, allowNull: false },
		film_id: { type: DataTypes.INTEGER, allowNull: false },
		rating: { type: DataTypes.INTEGER },
		comment_text: { type: DataTypes.TEXT },
		status: {
			type: DataTypes.ENUM('pending', 'approved', 'rejected', 'deleted'),
			defaultValue: 'pending'
		}
	},
	{ timestamps: true }
)

export default Comment
