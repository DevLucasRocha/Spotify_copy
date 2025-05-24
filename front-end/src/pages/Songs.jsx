import React, { useEffect, useState } from "react";
import { fetchSongs } from "../api/api";
import ItemList from "../components/ItemList";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSongs();
        setSongs(data);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar músicas.");
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