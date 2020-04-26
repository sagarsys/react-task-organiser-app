import { Router } from 'express'
import { dbConnect } from '../db/db-connect'

const commentRouter = Router()

commentRouter.post('/', async (req, res) => {
  const { comment } = req.body
  if (!comment) return res.status(400).send()
  try {
    await CommentController.add(comment)
    return res.status(201).send()
  } catch (e) {
    console.error(`Server: Failed to create comment: \n${e}`)
    return res.status(500).send(e)
  }
})

export const CommentController = {
  async add(comment) {
    const db = await dbConnect()
    await db.collection(`comments`).insertOne(comment)
  },
}

export default commentRouter
