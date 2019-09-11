import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  fetchBooks = (input) => {
    axios({
      method: 'GET',
      url: 'http://proxy.hackeryou.com',
      //OR url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        reqUrl: "https://www.goodreads.com/search.xml",
        params: {
          'key': "cKnr7UGQgCVhhgAGJEJg",
          'q': input
        },
        xmlToJSON: true,
        useCache: false
      }
    }).then((res) => {
      console.log(res);
    });
  }

  componentDidMount() {
    this.fetchBooks('rowling');
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
