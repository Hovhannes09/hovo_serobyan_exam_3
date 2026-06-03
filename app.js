import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import { migrate } from './migrate.js'
import routes from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use('/api', routes)
app.use(errorHandler)

await migrate()

app.listen(process.env.PORT, () => {
	console.log(`Server running on http://localhost:${process.env.PORT}`)
})
