import React from "react";
import { Grid } from "@material-ui/core"; 

function Album({...props}) {
    return (<Grid className="album" item xs={3}>{props.name}</Grid>)
}

export default Album;