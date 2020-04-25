import { MongoClient } from 'mongodb'

const url = `mongodb://localhost:27017/task_organiser_app`
let db = null

export async function dbConnect() {
  if (db) return db
  let client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  db = client.db()
  console.info('DB connected', db.databaseName)
  return db
}
