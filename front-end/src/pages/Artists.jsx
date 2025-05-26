import React, { useEffect, useState } from "react";
import { fetchArtists } from "../../api/api";
import ItemList from "../components/ItemList";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchArtists();
        setArtists(data);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar artistas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p>Carregando artistas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="artists-page">
      <ItemList
        title="Artistas"
        items={Infinity}
        itemsArray={artists}
        path="/artists"
        idPath="/artist"
      />
    </div>
  );
};

export default Artists;