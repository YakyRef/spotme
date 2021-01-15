import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { apiResponse: "" };
  // }

  // callAPI() {
  //   fetch("http://localhost:9000/testAPI")
  //     .then((res) => res.text())
  //     .then((res) => this.setState({ apiResponse: res }));
  // }

  // componentWillMount() {
  //   this.callAPI();
  // }
  render() {
    return (
      <div className="App">
        <p className="App-intro">xxxxx</p>
        <button onClick={this.hitBackend}>Send request</button>
      </div>
    );
  }
  hitBackend(){
    axios.get('/test')
    .then((response) => {
    console.log(response.data)
  })
 }
    
}

export default App;
