import React, { useState, useCallback } from "react";
import _ from "lodash";
import "./App.css";
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

function App() {
  const getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };
  const params = getHashParams();
  const [loggedIn] = useState(params.access_token ? true : false);
  const [currentAlbumSearch, setCurrentAlbum] = useState("");
  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  const debouncedSave = useCallback(
    _.debounce(
      (nextValue) =>
        spotifyWebApi.searchAlbums(nextValue).then((res) => console.log(res)),
      1000
    ),
    []
  );

  const handleAlbumSearch = (event) => {
    const { value: nextValue } = event.target;
    setCurrentAlbum(nextValue);
    debouncedSave(nextValue);
  };

  // spotifyWebApi.searchAlbums("mosh").then((res) => console.log(res));

  return (
    <div className="App">
      <a href="http://localhost:8888">
        <button>Loggin to Spotify</button>
      </a>
      <p>logged-in : {JSON.stringify(loggedIn)}</p>
      <p>
        <button onClick={() => this.getNowPlaying()}>getNowPlaying</button>
      </p>

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
    </div>
  );
}

export default App;
