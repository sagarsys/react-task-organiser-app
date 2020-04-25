import { Router } from 'express'
import { dbConnect } from '../db/db-connect'

const taskRouter = Router()

taskRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  if (!id) res.status(400).send()
  try {
    const task = await TaskController.findTask(id)
    res.status(200).send(task)
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
})

taskRouter.post('/', async (req, res) => {
  const { task } = req.body
  if (!task) res.status(400).send()
  try {
    await TaskController.addNewTask(task)
    res.status(201).send()
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
})

taskRouter.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { task } = req.body
  if (!task) res.status(400).send()
  try {
    await TaskController.updateTask(id, task)
    res.status(204).send()
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
})

export const TaskController = {
  addNewTask: async (task) => {
    const db = await dbConnect()
    const collection = db.collection(`tasks`)
    await collection.insertOne(task)
  },
  findTask: async (taskId) => {
    const db = await dbConnect()
    const collection = db.collection(`tasks`)
    return await collection.findOne({ id: taskId })
  },
  updateTask: async (id, task) => {
    const db = await dbConnect()
    const collection = db.collection(`tasks`)
    for (let [key, value] of Object.entries(task)) {
      if (key === 'id') continue
      await collection.updateOne({ id }, { $set: { [key]: value } })
    }
  },
}

export default taskRouter
