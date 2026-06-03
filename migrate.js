import sequelize from './clients/db.sequelize.js'
import './models/index.js'

export async function migrate() {
	try {
		await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
		await sequelize.sync({ force: true })
		await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
		console.log('Database migrated successfully.')
	} catch (error) {
		console.error('Error migrating database:', error)
	}
}
