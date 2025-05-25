import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI;

const client = new MongoClient(URI);

export const db = client.db("spotify");

async function testConnection() {
  try {
    const artists = await db.collection("artists").find({}).toArray();
    console.log("Conexão bem-sucedida! Artistas:", artists);
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
}
// const songCollection = await db.collection("songs").find({}).toArray();
// console.log(songCollection);
// JavaScript Assincrono
// await async
// Fullfilled