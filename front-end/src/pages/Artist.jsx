import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArtists, fetchSongs } from "../../api/api";
import SongList from "../components/SongList";

const Artist = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const artists = await fetchArtists();
      const foundArtist = artists.find((a) => String(a._id || a.id) === String(id));
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
      <button
        onClick={() => navigate(-1)}
        style={{
          margin: "16px 0",
          padding: "8px 16px",
          background: "#1DB954",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Voltar
      </button>
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