import React, { Component } from "react";
import "./App.css";
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();
class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      currentAlbumSearch: "",
      albums: [],
      nowPlaying: {
        name: "",
        image: "",
      },
    };
    this.handleAlbumSearch = this.handleAlbumSearch.bind(this);
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlayingTrack().then((res) => {
      console.log(res);
    });
  }
  componentDidMount() {
    // this.callApi()
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));
    
  }
  fetchAlbums(){
    spotifyWebApi.searchAlbums('mosh').then(res=>console.log(res))
  }

  callApi = async () => {
    // const response = await fetch('/api/hello');
    // const body = await response.json();
    // if (response.status !== 200) throw Error(body.message);
    // return body;
  };

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  handleAlbumSearch(event) {
    this.setState({ currentAlbumSearch: event.target.value });
  }
  render() {
    return (
      <div className="App">
        <a href="http://localhost:8888">
          <button>Loggin to Spotify</button>
        </a>
        <p>
          <button onClick={() => this.getNowPlaying()}>getNowPlaying</button>
        </p>
       
        <form>
          <label>
            Search:
            <input
              type="text"
              value={this.state.currentAlbumSearch}
              onChange={this.handleAlbumSearch}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
