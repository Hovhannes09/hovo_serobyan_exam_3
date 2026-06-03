import { DataTypes } from 'sequelize'
import sequelize from '../clients/db.sequelize.js'

const Comment = sequelize.define('Comment', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	filmId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false
	}
})

export default Comment
