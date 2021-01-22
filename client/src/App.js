import React, { useState, useCallback } from "react";
import _ from "lodash";
import "./App.css";
import Album from "./components/album/Album.js";
import { getHashParams } from "./helpers/hashParams";
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

function App() {
  const params = getHashParams();
  const [loggedIn] = useState(params.access_token ? true : false);
  const [currentAlbumSearch, setCurrentAlbum] = useState("");
  const [albums, setAlbums] = useState({ items: [], total: 0, limit: 0 });

  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  const getAlbumsDebounced = useCallback(
    _.debounce(
      (nextValue) =>
        spotifyWebApi
          .searchAlbums(nextValue)
          .then((res) => setAlbums(res.albums || {})),
      1000
    ),
    []
  );

  const handleAlbumSearch = (event) => {
    const { value: nextValue } = event.target;
    setCurrentAlbum(nextValue);
    getAlbumsDebounced(nextValue);
  };

  return (
    <div className="App">
      <a href="http://localhost:8888">
        <button>Loggin to Spotify</button>
      </a>
      <p>logged-in : {JSON.stringify(loggedIn)}</p>
      <form>
        <label>
          Search:
          <input
            type="text"
            value={currentAlbumSearch}
            onChange={handleAlbumSearch}
          />
        </label>
      </form>
      <div className="albums">
        {albums.items ? (
          albums.items.map((album) => <Album key={album.id} {...album} />)
        ) : (
          <span>no results...</span>
        )}
      </div>
      <div>
        <button>Next</button>
      </div>
    </div>
  );
}

export default App;
