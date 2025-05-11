// JavaScript Assincrono
// await async
// Fullfilled
import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://devlucasrocha:9804DiMqjGq6ln0N@projetos-academicos.gpriyp3.mongodb.net/?retryWrites=true&w=majority&appName=Projetos-academicos";

const client = new MongoClient(URI);

export const db = client.db("spotify");
// const songCollection = await db.collection("songs").find({}).toArray();

// console.log(songCollection);
