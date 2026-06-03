import { DataTypes } from 'sequelize'
import sequelize from '../clients/db.sequelize.js'

const Film = sequelize.define(
	'Film',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		title: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.TEXT },
		genre: { type: DataTypes.STRING },
		duration: { type: DataTypes.INTEGER }
	},
	{ timestamps: false }
)

export default Film
