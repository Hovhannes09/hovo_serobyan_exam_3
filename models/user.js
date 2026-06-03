import { DataTypes } from 'sequelize'
import sequelize from '../clients/db.sequelize.js'

const User = sequelize.define(
	'User',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		username: { type: DataTypes.STRING, allowNull: false, unique: true },
		email: { type: DataTypes.STRING, allowNull: false, unique: true },
		password: { type: DataTypes.STRING, allowNull: false },
		full_name: { type: DataTypes.STRING },
		role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' }
	},
	{ timestamps: false }
)

export default User
