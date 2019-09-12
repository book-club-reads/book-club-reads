import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';

class Search extends Component {
  constructor(){
    super();
    this.state = {
      userInput: "",
      // books: [],
    }
  }

  handleChange = (e) => {
    this.setState ({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState ({
        userInput: event.target.value
    })
    this.fetchBooks(this.state.userInput);
    console.log("userInput", this.state.userInput);
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
      const books = res.data.GoodreadsResponse.search.results.work;
      this.props.searchBooksArray(books);
    });
  }

  

  render(){
    return(
      <section>
        <form action="">
          <input  name = "userInput"
            type="text"
            onChange = {this.handleChange}
            value = {this.state.userInput}
            placeholder = "Search title or author" 
          />
          <button
            className="submitButton"
            id="submitButton"
            onClick={this.handleSubmit}
            type="submit"
          >
            Submit
          </button>
        </form>
      </section>
    )
  }
}

export default Search;