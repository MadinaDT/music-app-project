import React, { useReducer, useState, useEffect } from "react";
import styled from "styled-components";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "./Playlists";
import CreatePlaylist from "./CreatePlaylist";
import { useStateProvider } from "../utils/StateProvider";
import reducer, { initialState } from "../utils/reducer";

export default function Sidebar() {
  // const [{ playlists, token, user }, dispatch] = useStateProvider();

  // console.log(user[0].token);
  // console.log("State", useReducer(reducer, initialState));

  // const handleCreatePlaylist = async () => {
  //   const playlistName = prompt("Enter playlist name:");
  //   if (playlistName) {
  //     try {
  //       const response = await CreatePlaylist(user.id, token, playlistName);
  //       dispatch({
  //         type: "SET_PLAYLISTS",
  //         playlists: [...playlists, response],
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  return (
    <Container>
      <div className="top-links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify-logo"
          />
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your library</span>
          </li>
        </ul>
      </div>

      <Playlists />
      {/* <CreatePlaylistButton onClick={() => handleCreatePlaylist()}>
        Create a Playlist
      </CreatePlaylistButton> */}
    </Container>
  );
}

// const CreatePlaylistButton = styled.button`
//   background-color: transparent;
//   border: none;
//   color: #b3b3b3;
//   cursor: pointer;
//   margin: 1rem;
//   transition: 0.3s ease-in-out;
//   &:hover {
//     color: white;
//   }
// `;

const Container = styled.div`
  background-color: #171821;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top-links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
`;
