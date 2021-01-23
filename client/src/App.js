import React, { useState, useCallback } from "react";
import _ from "lodash";
import "./App.scss";
import Album from "./components/album/Album.js";
import { Button, TextField, Grid } from "@material-ui/core";
import { getHashParams } from "./helpers/hashParams";
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

function App() {
  const params = getHashParams();
  const limit = 15;
  const [offset, setOffset] = useState(0);
  const [loggedIn] = useState(params.access_token ? true : false);
  const [currentAlbumSearch, setCurrentAlbum] = useState("");
  const [albums, setAlbums] = useState({
    items: [],
    total: 0,
  });

  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  const fetchAlbumsFromApi = (value) => {
    return spotifyWebApi
      .searchAlbums(value, { limit, offset })
      .then((res) => setAlbums({ ...albums, ...res.albums }));
  };

  const getAlbumsDebounced = useCallback(
    _.debounce(fetchAlbumsFromApi, 1000),
    []
  );

  const handleAlbumSearch = (event) => {
    const { value: nextValue } = event.target;
    setCurrentAlbum(nextValue);
    getAlbumsDebounced(nextValue);
  };

  const onNextClick = () => {
    setOffset(offset + limit);
    fetchAlbumsFromApi(currentAlbumSearch);
  };
  const onBackClick = () => {
    setOffset(offset - limit);
    fetchAlbumsFromApi(currentAlbumSearch);
  };
  return !loggedIn ? (
    <div className="App">
      <a href="http://localhost:8888">
        <button>Loggin to Spotify</button>
      </a>
    </div>
  ) : (
    <div className="App">
      <form>
        <label>
          <TextField
            id="search"
            label="search"
            variant="outlined"
            value={currentAlbumSearch}
            onChange={handleAlbumSearch}
          />
        </label>
      </form>
      <Grid container className="albums" spacing={5}>
        {albums.items ? (
          albums.items.map((album) => <Album key={album.id} {...album} />)
        ) : (
          <span>no results...</span>
        )}
      </Grid>
      <div>
        <Button onClick={onBackClick} disabled={offset < 1 ? true : false}>
          Back
        </Button>
        <Button onClick={onNextClick}>Next</Button>
      </div>
    </div>
  );
}

export default App;
