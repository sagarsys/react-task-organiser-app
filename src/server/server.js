import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import './db/db-init'
import taskRouter from './controllers/task.controller'
import authenticationRouter from './controllers/authentication.controller'

const port = 7777
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/task', taskRouter)
app.use('/authenticate', authenticationRouter)

app.listen(port, console.info(`Server listening on port ${port}`))
