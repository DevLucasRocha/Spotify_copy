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

  // Encontra o índice da música atual na lista do artista
  const currentIndex = songsArrayFromArtist.findIndex(
    (s) => String(s._id || s.id) === String(id)
  );

  return (
    <div className="song">
      <div className="song__container">
        <div className="song__image-container">
          <img 
            src={song.image} 
            alt={`Imagem da música ${song.name}`} 
            loading="lazy"
          />
        </div>
      </div>

      <div className="song__bar">
        <Link to={`/artist/${artistObj._id || artistObj.id}`} className="song__artist-image">
          <img
            width={75}
            height={75}
            src={artistObj.image}
            alt={`Imagem do Artista ${song.artist}`}
            loading="lazy"
          />
        </Link>

        <Player
          duration={song.duration}
          audio={song.audio}
          songsArrayFromArtist={songsArrayFromArtist}
          currentIndex={currentIndex}
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