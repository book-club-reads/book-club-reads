import React, { Component } from "react";

import "./App.css";
import axios from "axios";
class App extends Component {
  componentDidMount() {
    axios({
      method: "GET",
      url: "https://proxy.hackeryou.com",
      dataResponse: "xml",
      params: {
        reqURL:
          "https://www.goodreads.com/book/title.xml?author=Arthur+Conan+Doyle&key=CzLumnN1aSeTwYzHRbIeRw&title=Hound+of+the+Baskervilles",
        params: {
          key: "CzLumnN1aSeTwYzHRbIeRw"
        }
      },
      xmlToJSON: true
    }).then(function(data) {
      console.log(data);
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Hi</h1>
      </div>
    );
  }
}

export default App;
