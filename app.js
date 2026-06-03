import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import sequelize from './clients/db.sequelize.js'
import { migrate } from './migrate.js'

const app = express()

await migrate()

app.listen(process.env.PORT, () => {
	console.log(`Server running on http://localhost:${process.env.PORT}`)
})
