import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Login() {
  const handleClick = () => {
    const clientId = "dcd49ff85ba948cca5a485adb009aaf4";
    const redirectUrl = "http://localhost:3000/callback";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify-logo"
      />
      <button onClick={handleClick}>Connect to your Spotify account</button>

      <Link to="/search" className="searcher-button">
        Open The Searcher
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    to top,
    #505285 0%,
    #585e92 12%,
    #65689f 25%,
    #7474b0 37%,
    #7e7ebb 50%,
    #8389c7 62%,
    #9795d4 75%,
    #a2a1dc 87%,
    #b5aee4 100%
  );
  gap: 5rem;
  img {
    height: 20vh;
  }
  button,
  .searcher-button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: #b5aee4;
    font-size: 1.4rem;
    cursor: pointer;
    text-decoration: none;
  }
`;
