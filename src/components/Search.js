import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';

class Search extends Component {
  constructor(){
    super();
    this.state = {
      userInput: "",
    }
  }

  //API call to good reads based on user input
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
  
      this.handleResults(res);
  
    }).catch((error) => {
      alert("No results");
      const emptyBooks = []
      this.props.bookResults(emptyBooks);
    })
  }

  //Function to alert user if there are results or not from query
  handleResults = (results) => {
    const noResults = results.data.GoodreadsResponse.search.results
    const books = results.data.GoodreadsResponse.search.results.work;

    if (noResults === '') {

      alert("No results");
      const emptyBooks = []
      this.props.bookResults(emptyBooks);

    } else this.props.bookResults(books);
  }

  //get value from user input search field
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //once we get the value from search field, make API call 
  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      userInput: event.target.value
    })
    this.fetchBooks(this.state.userInput);
  }
  
  //search form fields
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