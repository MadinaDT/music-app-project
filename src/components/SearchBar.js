import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import styled from "styled-components";

const CLIENT_ID = "dcd49ff85ba948cca5a485adb009aaf4";
const CLIENT_SECRET = "fd1994784a134821bbc51399045ed298";

export default function SearchBar({ onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setToken(data.access_token));
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);

    if (event.target.value === "") {
      setResults([]);
      onSearchResults([]);
    }
  };

  const handleSearch = () => {
    console.log(searchTerm);
    axios
      .get("https://api.spotify.com/v1/search", {
        params: {
          q: searchTerm,
          type: "track",
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setResults(response.data.tracks.items);
        onSearchResults(response.data.tracks.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Artists, songs, podcasts"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div className="search" onClick={handleSearch}>
          <FaSearch />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .search {
    cursor: pointer;
    text-decoration: none;
  }
  input {
    margin-top: 20px;
    width: 100%;
    max-width: 500px;
  }
`;
