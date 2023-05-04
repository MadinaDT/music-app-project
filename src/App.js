import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/Constants";
import Spotify from "./components/Spotify";
import Search from "./components/Search";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];

      dispatch({ type: reducerCases.SET_TOKEN, token });
      navigate("/");
    }
  }, [token, dispatch, navigate]);

  return (
    <Routes>
      <Route path="/" element={token ? <Spotify /> : <Login />} />
      <Route path="/spotify" element={<Spotify />} />
      <Route
        path="/search"
        element={<Search onSearchResults={setSearchResults} />}
      />
    </Routes>
  );
}
