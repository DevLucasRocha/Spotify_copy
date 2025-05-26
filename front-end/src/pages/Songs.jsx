import React, { useEffect, useState } from "react";
import { fetchSongs } from "../../api/api";
import ItemList from "../components/ItemList";
import { useNavigate } from "react-router-dom";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSongs();
        setSongs(data);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar músicas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p>Carregando músicas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="songs-page">
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
      <ItemList
        title="Músicas"
        items={Infinity}
        itemsArray={songs}
        path="/songs"
        idPath="/song"
      />
    </div>
  );
};

export default Songs;