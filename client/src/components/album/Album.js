import React from "react";
import { GridListTile, GridListTileBar } from "@material-ui/core";

function Album({ ...props }) {
  return (
    <GridListTile className="album" key={props.uri}>
      <img height="120" src={props.images[0].url}  className="album__image" alt={props.name} />
      <GridListTileBar
        title={props.name}
        subtitle={<span>by: {props.artists[0].name}</span>}
      />
    </GridListTile>
  );
}

export default Album;
