import React from "react";
import { Link } from "react-router-dom";
import { GridListTile, GridListTileBar } from "@material-ui/core";

function Album({ ...props }) {
  return (
    <GridListTile className="album" key={props.uri}>
      <Link to={`/album/${props.id}`}>
        <img
          src={props.images[0].url}
          className="album__image"
          alt={props.name}
        />
        <GridListTileBar
          title={props.name}
          subtitle={<span>by: {props.artists[0].name}</span>}
        />
      </Link>
    </GridListTile>
  );
}

export default Album;
