import { MongoClient } from "mongodb";
const connectionString ="mongodb://localhost:27017/trip";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}
let db = conn.db("trip");
export default db;