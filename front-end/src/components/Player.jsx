import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// Formata o tempo em mm:ss
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

// Converte string "mm:ss" para segundos
const timeInSeconds = (timeString) => {
  if (!timeString) return 0;
  const splitArray = timeString.split(":");
  const minutes = Number(splitArray[0]);
  const seconds = Number(splitArray[1]);
  return seconds + minutes * 60;
};

const Player = ({
  duration,
  audio,
  songsArrayFromArtist = [],
  currentIndex = 0,
}) => {
  const audioPlayer = useRef();
  const progressBar = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const durationInSeconds = timeInSeconds(duration);

  // Calcula o id da música anterior e próxima
  const prevSongId =
    songsArrayFromArtist.length > 0
      ? songsArrayFromArtist[
          (currentIndex - 1 + songsArrayFromArtist.length) %
            songsArrayFromArtist.length
        ]?._id || songsArrayFromArtist[
          (currentIndex - 1 + songsArrayFromArtist.length) %
            songsArrayFromArtist.length
        ]?.id
      : null;

  const nextSongId =
    songsArrayFromArtist.length > 0
      ? songsArrayFromArtist[
          (currentIndex + 1) % songsArrayFromArtist.length
        ]?._id || songsArrayFromArtist[
          (currentIndex + 1) % songsArrayFromArtist.length
        ]?.id
      : null;

  // Atualiza o tempo conforme a música toca
  useEffect(() => {
    const audioEl = audioPlayer.current;
    if (!audioEl) return;
    const updateTime = () => setCurrentTime(audioEl.currentTime);
    audioEl.addEventListener("timeupdate", updateTime);
    return () => audioEl.removeEventListener("timeupdate", updateTime);
  }, []);

  // Sempre que trocar de música, reseta o player
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioPlayer.current) {
      audioPlayer.current.pause();
      audioPlayer.current.currentTime = 0;
    }
  }, [audio]);

  // Play/Pause
  const playPause = () => {
    if (!audioPlayer.current) return;
    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Atualiza barra de progresso visual
  useEffect(() => {
    if (progressBar.current) {
      progressBar.current.style.setProperty(
        "--_progress",
         `${(currentTime / durationInSeconds) * 100}%`
      );
    }
  }, [currentTime, durationInSeconds]);

  // Permite arrastar a barra para avançar/voltar
  const handleSeek = (e) => {
    const time = Number(e.target.value);
    audioPlayer.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <div className="player">
      {/* Controles de navegação */}
      <div className="player__controllers">
        <Link to={prevSongId ? `/song/${prevSongId}` : "#"}>
          <FontAwesomeIcon className="player__icon" icon={faBackwardStep} />
        </Link>
        <FontAwesomeIcon
          className="player__icon player__icon--play"
          icon={isPlaying ? faCirclePause : faCirclePlay}
          onClick={playPause}
        />
        <Link to={nextSongId ? `/song/${nextSongId}` : "#"}>
          <FontAwesomeIcon className="player__icon" icon={faForwardStep} />
        </Link>
      </div>

      {/* Barra de progresso */}
      <div className="player__progress">
        <p>{formatTime(currentTime)}</p>
        <div className="player__bar">
          <input
            type="range"
            min={0}
            max={durationInSeconds}
            value={currentTime}
            onChange={handleSeek}
            style={{ width: "100%" }}
          />
          <div ref={progressBar} className="player__bar-progress"></div>
        </div>
        <p>{duration}</p>
      </div>

      {/* Elemento de áudio */}
      <audio ref={audioPlayer} src={audio} />
    </div>
  );
};

export default Player;