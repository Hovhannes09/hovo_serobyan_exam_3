import { DataTypes } from 'sequelize'
import sequelize from '../clients/db.sequelize.js'

const Film = sequelize.define('Film', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT
	},
	duration: {
		type: DataTypes.INTEGER
	}
})

export default Film
