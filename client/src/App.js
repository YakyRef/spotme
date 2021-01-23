import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import _ from "lodash";
import "./App.scss";

import Album from "./components/album/Album.js";
import AlbumPage from "./pages/album/AlbumPage";
import { Button, TextField, GridList } from "@material-ui/core";
import { getHashParams } from "./helpers/hashParams";
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

function App() {
  const params = getHashParams();
  const limit = 15;
  const [offset, setOffset] = useState(0);
  const [loggedIn, setLoggedIn] = useState(params.access_token ? true : false);
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
      .then((res) => {
        setAlbums({ ...albums, ...res.albums });
      })
      .catch((err) => err.status === 401 && setLoggedIn(false));
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
      <a href="http://localhost:8888" className="log-in-button">
        <Button>Loggin to Spotify</Button>
      </a>
    </div>
  ) : (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <div id="search">
              <TextField
                id="search__input"
                label="search"
                variant="filled"
                value={currentAlbumSearch}
                onChange={handleAlbumSearch}
              />
            </div>

            <GridList cellHeight={200} className="albums">
              {albums.items ? (
                albums.items.map((album) => <Album key={album.id} {...album} />)
              ) : (
                <span>no results...</span>
              )}
            </GridList>

            <div className="nav-bar">
              <Button
                className="nav-bar__button"
                variant="contained"
                color="primary"
                onClick={onBackClick}
                disabled={offset < 1 ? true : false}
              >
                Back
              </Button>
              <Button
                className="nav-bar__button"
                variant="contained"
                color="primary"
                disabled={!albums.items.length ? true : false}
                onClick={onNextClick}
              >
                Next
              </Button>
            </div>
          </Route>
          <Route path="/album/:id">
            <AlbumPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
