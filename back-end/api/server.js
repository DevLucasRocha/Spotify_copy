// API significa Application Programming Interface
// POST, GET, PUT, DELETE
// CRUD - Create Read Update Delete
// Endpoint
// Middleware

import express from "express";
import cors from "cors";
import compression from "compression";
import { db } from "./connect.js";

const app = express();
const PORT = 3001;

app.use(compression()); // serve para compactar o conteúdo
app.use(cors({ origin: [
    "https://spotify-web-copy.netlify.app",
    "https://project-spotifyweb.netlify.app" 
  ] })); 

app.get("/", (request, response) => {
  response.send("Só vamos trabalhar com os endpoints '/artists' e '/songs'");
});

app.get("/artists", async (request, response) => {
  response.send(await db.collection("artists").find({}).toArray());
});

app.get("/songs", async (request, response) => {
  response.send(await db.collection("songs").find({}).toArray());
});

app.listen(PORT, () => {
  console.log(`Servidor está escutando na porta ${PORT}`);
});
