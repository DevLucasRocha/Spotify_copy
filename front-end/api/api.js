// Fetch ou Axios
import axios from "axios";

const URL = "https://spotify-backend-q87w.onrender.com";

export async function fetchArtists() {
  try {
    const response = await axios.get(`${URL}/artists`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar artistas:", error);
    throw error;
  }
}

export async function fetchSongs() {
  try {
    const response = await axios.get(`${URL}/songs`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    throw error;
  }
}
// console.log(responseArtists.data);
