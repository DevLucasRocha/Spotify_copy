import React, { useEffect, useState } from "react";
import { fetchArtists, fetchSongs } from "../api/api";
import ItemList from "../components/ItemList";

const Home = () => {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [artistsData, songsData] = await Promise.all([
          fetchArtists(),
          fetchSongs(),
        ]);
        setArtists(artistsData);
        setSongs(songsData);
        setError(null);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <p>Loading homepage...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-page">
      <ItemList
        title="Artistas"
        items={10}
        itemsArray={artists}
        path="/artists"
        idPath="/artist"
      />
      <ItemList
        title="Músicas"
        items={20}
        itemsArray={songs}
        path="/songs"
        idPath="/song"
      />
    </div>
  );
};

export default Home;
