import React from "react";

function Album({...props}) {
    return (<li>{props.name}</li>)
}

export default Album;