import React, { useState } from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from "../utils/StateProvider";
import SearchBar from "./SearchBar";

export default function Navbar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();
  const [searchResults, setSearchResults] = useState([]);

  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <Container navBackground={navBackground}>
      <div className="search-container">
        <div className="search-input">
          <SearchBar onSearchResults={updateSearchResults} />
        </div>
        <div className="search-results">
          {searchResults.slice(0, 5).map((result) => (
            <div className="song-card" key={result.id}>
              <img src={result.album.images[2].url} alt="album art" />
              <div className="song-info">
                <div>{result.name}</div>
                <div>{result.artists[0].name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="avatar-container">
        <a href="#">
          <CgProfile />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};

  .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    width: 70%;
  }

  .search-input {
    flex: 1;
  }

  .search-results {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    max-width: 100%;
  }

  .song-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 120px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 8px;
    text-align: center;
  }

  .song-info {
    line-height: 1.2;
    height: 2.4em;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 10px;
    color: white;
  }

  .song-card img {
    width: 100%;
    height: auto;
    margin-bottom: 5px;
  }

  .avatar-container {
    background-color: #171821;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar-container a {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: white;
    font-weight: bold;
  }

  .avatar-container svg {
    font-size: 1.3rem;
    background-color: #282828;
    padding: 0.2rem;
    border-radius: 1rem;
    color: #c7c5c5;
  }
`;
