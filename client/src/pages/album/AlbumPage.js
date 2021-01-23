import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GridListTile, GridListTileBar } from "@material-ui/core";
import { getHashParams } from "../../helpers/hashParams";
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

function AlbumPage({ ...props }) {
  let { id } = useParams();
  const params = getHashParams();
  const [album, setAlbum] = useState(null);

  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }
  if (!album) {
    spotifyWebApi
      .getAlbum(id)
      .then((res) => {
        setAlbum(res);
      })
      .catch((err) => err.status === 401 && alert("SessionExpired"));
  }

  return (
    <div className="album-page">
      {album ? (
        <>
          <div className="album-page__header">
            <div className="thumbnail">
                <img src={album.images[0].url} alt={album.name} />
            </div>
            <div className="description">
              <div className="description__band">{album.artists[0].name}</div>
              <div className="description__album">{album.name}</div>
            </div>
          </div>
          <div className="album-page__tracks">
            {album.tracks.items.length &&
              album.tracks.items.map((track) => (
                <div className="track">{track.name}</div>
              ))}
          </div>
        </>
      ) : (
        "...."
      )}
    </div>
  );
}

export default AlbumPage;
