import cookieParser from 'cookie-parser'
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import errorHandler from './middlewares/errorHandler.js'
import { migrate } from './migrate.js'
import routes from './routes/index.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))

app.use('/api', routes)

app.use(errorHandler)

await migrate()

app.listen(process.env.PORT, () => {
	console.log(`Server running on http://localhost:${process.env.PORT}`)
})
