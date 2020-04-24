import { defaultState } from './default-state'
import { dbConnect } from './db-connect'

async function initializeDb() {
  let db = await dbConnect()
  for (let collectionName in defaultState) {
    let collection = db.collection(collectionName)
    await collection.insertMany(defaultState[collectionName])
  }
}

initializeDb()
