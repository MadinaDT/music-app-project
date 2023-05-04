import React from "react";
import styled from "styled-components";

import { useStateProvider } from "../utils/StateProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, FormControl, Button, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";

const CLIENT_ID = "dcd49ff85ba948cca5a485adb009aaf4";
const CLIENT_SECRET = "fd1994784a134821bbc51399045ed298";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState([]);

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

  async function search() {
    const searchParameters = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };

    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    const returnedAlbums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data.items);
      });
  }

  return (
    <Container>
      <div className="search-input">
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search for Artist"
            type="input"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </div>

      <div className="albums-display">
        <Row>
          {albums.map((album, i) => {
            return (
              <Card key={album.id}>
                <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 50px;
  background: linear-gradient(
    to top,
    #1e213c,
    #242741,
    #353b6e,
    #5c5f7f,
    #9597a7
  );

  .search-input {
    margin-bottom: 20px;
    width: 100%;
    max-width: 500px;

    input {
      width: 70%;
      border-radius: 5px;
      border: none;
      padding: 10px;
      margin-right: 10px;
      font-size: 1.2rem;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    }
    button {
      width: 20%;
      background-color: #232531;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      color: #b5aee4;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: #171821;
      }
    }
  }
  .albums-display {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    max-width: 1000px;

    .card {
      display: flex;
      flex-direction: column;

      justify-content: center;
      align-items: center;
      text-align: center;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      gap: 1rem;
      margin: 10px;
      width: 300px;
      height: 400px;
      padding: 20px;

      .card-img-top {
        height: 200px;
        object-fit: cover;
      }

      .card-body {
        padding: 10px;

        .card-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: #232531;
        }
      }
    }
  }
`;
