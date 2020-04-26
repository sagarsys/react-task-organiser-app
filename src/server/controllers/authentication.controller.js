import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import md5 from 'md5'
import { dbConnect } from '../db/db-connect'

const authenticationRouter = Router()
const authenticationTokens = []

authenticationRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await AuthenticationController.findUser(username)
  if (!user) return res.status(404).send(`Invalid credentials`)

  const isPasswordCorrect = AuthenticationController.checkUserPassword(
    user,
    password
  )
  if (!isPasswordCorrect) return res.status(400).send(`Invalid credentials`)

  const token = uuid()
  AuthenticationController.updateUserToken(user, token)
  const state = await AuthenticationController.retrieveUserState(user)
  res.status(200).send({ token, state })
})

export const AuthenticationController = {
  async findUser(username) {
    const db = await dbConnect()
    const collection = db.collection(`users`)
    return await collection.findOne({ name: username })
  },
  checkUserPassword(user, password) {
    return md5(password) === user.passwordHash
  },
  updateUserToken(user, token) {
    authenticationTokens.push({
      token,
      userId: user.id,
    })
  },
  async retrieveUserState(user) {
    const db = await dbConnect()
    const tasks = await db
      .collection(`tasks`)
      .find({ owner: user.id })
      .toArray()
    const groups = await db.collection(`groups`).find({}).toArray()
    return {
      tasks,
      groups,
      session: {
        id: user.id,
        username: user.name,
        authenticated: `AUTHENTICATED`,
      },
    }
  },
}

export default authenticationRouter
