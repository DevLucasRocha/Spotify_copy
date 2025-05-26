import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArtists, fetchSongs } from "../../api/api";
import SongList from "../components/SongList";

const Artist = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const artists = await fetchArtists();
      const foundArtist = artists.find((a) => a._id === id);
      setArtist(foundArtist);

      const allSongs = await fetchSongs();
      const songsFromArtist = allSongs.filter((s) => s.artist === foundArtist.name);
      setSongs(songsFromArtist);

      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!artist) return <p>Artista não encontrado.</p>;

  return (
    <div className="artist">
      <div
        className="artist__header"
        style={{
          backgroundImage: `linear-gradient(to bottom, var(--_shade), var(--_shade)),url(${artist.banner})`,
        }}
      >
        <h2 className="artist__title">{artist.name}</h2>
      </div>
      <div className="artist__body">
        <h2>Populares</h2>
        <SongList songsArray={songs} />
      </div>
    </div>
  );
};

export default Artist;