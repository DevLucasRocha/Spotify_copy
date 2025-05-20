import { artistArray } from "../../front-end/src/assets/database/artists.js";
import { songsArray } from "../../front-end/src/assets/database/songs.js";
import { db } from "./connect.js";

const newArtistArray = artistArray.map((currentArtistObj) => {
  const newArtistObj = { ...currentArtistObj };
  delete newArtistObj.id;
  return newArtistObj;
});

const newSongsArray = songsArray.map((currentSongObj) => {
  const newSongObj = { ...currentSongObj };
  delete newSongObj.id;
  return newSongObj;
});

async function seedDatabase() {
  try {
    const responseSongs = await db.collection("songs").insertMany(newSongsArray);
    const responseArtists = await db.collection("artists").insertMany(newArtistArray);

    console.log("Músicas inseridas:", responseSongs.insertedCount);
    console.log("Artistas inseridos:", responseArtists.insertedCount);
  } catch (error) {
    console.error("Erro ao inserir no banco:", error);
  }
}

seedDatabase();

// console.log(newArtistArray);
// console.log(newSongsArray);
// console.log(songsArray);
