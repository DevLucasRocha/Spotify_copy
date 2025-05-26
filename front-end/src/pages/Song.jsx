import React, { useEffect, useState } from "react";
import Player from "../components/Player";
import { Link, useParams } from "react-router-dom";
import { fetchSongs, fetchArtists } from "../../api/api";

const Song = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [artistObj, setArtistObj] = useState(null);
  const [songsArrayFromArtist, setSongsArrayFromArtist] = useState([]);

  useEffect(() => {
    async function load() {
      const songs = await fetchSongs();
      const foundSong = songs.find((s) => String(s._id || s.id) === String(id));
      setSong(foundSong);

      const artists = await fetchArtists();
      const foundArtist = artists.find(
        (a) => a.name === foundSong.artist
      );
      setArtistObj(foundArtist);

      const songsFromArtist = songs.filter(
        (s) => s.artist === foundSong.artist
      );
      setSongsArrayFromArtist(songsFromArtist);
    }
    load();
  }, [id]);

  if (!song || !artistObj) return <p>Carregando...</p>;

  // Evita erro se houver só uma música do artista
  const randomIndex = Math.floor(Math.random() * songsArrayFromArtist.length);
  let randomIdFromArtist = songsArrayFromArtist[randomIndex]?._id || songsArrayFromArtist[randomIndex]?.id;

  // Garante que não seja a mesma música
  let randomIndex2 = randomIndex;
  while (songsArrayFromArtist.length > 1 && randomIndex2 === randomIndex) {
    randomIndex2 = Math.floor(Math.random() * songsArrayFromArtist.length);
  }
  let randomId2FromArtist = songsArrayFromArtist[randomIndex2]?._id || songsArrayFromArtist[randomIndex2]?.id;

  return (
    <div className="song">
      <div className="song__container">
        <div className="song__image-container">
          <img src={song.image} alt={`Imagem da música ${song.name}`} />
        </div>
      </div>

      <div className="song__bar">
        <Link to={`/artist/${artistObj._id || artistObj.id}`} className="song__artist-image">
          <img
            width={75}
            height={75}
            src={artistObj.image}
            alt={`Imagem do Artista ${song.artist}`}
          />
        </Link>

        <Player
          duration={song.duration}
          randomIdFromArtist={randomIdFromArtist}
          randomId2FromArtist={randomId2FromArtist}
          audio={song.audio}
        />

        <div>
          <p className="song__name">{song.name}</p>
          <p>{song.artist}</p>
        </div>
      </div>
    </div>
  );
};

export default Song;