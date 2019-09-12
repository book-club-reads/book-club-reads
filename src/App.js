import React, { Component } from "react";
import firebase from "./firebase";
import Header from "./components/Header";
import Tracker from "./components/Tracker";
import Search from "./components/Search";
import Results from "./components/Results";
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: []
    };
  }

  //app.js: write a function to tell search.js to do something
  //const result = searchFn()
  //pass result to Result.js to render

  //user input from search field
  bookResults = searchBooks => {
    this.setState({
      books: searchBooks
    });

    console.log("state books", this.state.books);
  };

  render() {
    return (
      <div>
        <Header />
        <Tracker />
        <Search bookResults={this.bookResults} />
        <Results displayBookResults={this.state.books} />
      </div>
    );
  }
}
export default App;
