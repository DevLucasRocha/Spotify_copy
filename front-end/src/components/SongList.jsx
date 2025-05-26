import React, { useState } from "react";
import SongItem from "./SongItem";
import { Link } from "react-router-dom";

const SongList = ({ songsArray }) => {
  const [items, setItems] = useState(5);

  return (
    <div className="song-list">
      {songsArray
        .filter((currentValue, index) => index < items)
        .map((currentSongObj, index) => (
          <Link
            to={`/song/${currentSongObj._id || currentSongObj.id}`}
            key={currentSongObj._id || currentSongObj.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <SongItem {...currentSongObj} index={index} />
          </Link>
        ))}

      <p
        className="song-list__see-more"
        onClick={() => setItems(items + 5)}
      >
        Ver mais
      </p>
    </div>
  );
};

export default SongList;