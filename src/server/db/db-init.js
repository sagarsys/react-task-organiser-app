import { defaultState } from '../default-state'
import { dbConnect } from './db-connect'

export async function initializeDb() {
  const db = await dbConnect()
  const user = await  db.collection(`users`).findOne({ id: 'U1' })
  if (!user) {
    for (const collectionName in defaultState) {
      const collection = db.collection(collectionName)
      await collection.insertMany(defaultState[collectionName])
    }
  }
}

initializeDb()
