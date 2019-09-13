import React, { Component } from "react";
import firebase from "./firebase";
import Header from "./components/Header";
import Tracker from "./components/Tracker";
import Search from "./components/Search";
import Results from "./components/Results";
import ReadingList from "./components/ReadingList";
import "./App.scss";
import DisplayFirebase from "./components/DisplayFirebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      addBook: ''
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

  addBook = bookToAdd => {
    console.log("bookToAdd", bookToAdd);
    this.setState ({
      addBook: bookToAdd
    })
  }

  
  render() {
    return (
      <div>
        <Header />
        <Tracker />
        <Search bookResults={this.bookResults} />
        <Results displayBookResults={this.state.books}
                addBook={this.addBook}
        />
        <ReadingList addBook = {this.state.addBook} />
        <DisplayFirebase />
      </div>
    );
  }
}
export default App;
