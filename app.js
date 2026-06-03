import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import sequelize from './clients/db.sequelize.js'

import { migrate } from './migrate.js'
import routes from './routes/index.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.static('public'))
app.use('/api', routes)

await migrate()

app.listen(process.env.PORT, () => {
	console.log(`Server running on http://localhost:${process.env.PORT}`)
})
