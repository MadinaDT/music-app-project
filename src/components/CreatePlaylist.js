import axios from "axios";

export default async function CreatePlaylist(user_id, token, playlist_name) {
  try {
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${user_id}/playlists`,
      {
        name: playlist_name,
        description: "New playlist description",
        public: false,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return "Failed to create playlist";
  }
}
