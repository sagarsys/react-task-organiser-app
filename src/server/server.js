import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'

import './db/db-init'
import taskRouter from './controllers/task.controller'
import authenticationRouter from './controllers/authentication.controller'

const port = process.env.PORT || 7777
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/task', taskRouter)
app.use('/authenticate', authenticationRouter)

if (process.env.NODE_ENV === `production`) {
  app.use(express.static(path.resolve(__dirname, `../../dist`)))
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve('index.html'))
  })
}

app.listen(port, console.info(`Server listening on port ${port}`))
