import React, { Component } from "react";
import firebase from "./firebase";
import Header from "./components/Header";
import Tracker from "./components/Tracker";
import Search from "./components/Search";
import Results from "./components/Results";
import Modal from "./components/Modal"
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      isShowing: false,
      select: '1'
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

  openModal = (books) => {
    this.setState({
      isShowing: true
    })
  };

  closeModal = () => {
    this.setState({
      isShowing: false
    })
  }

  selectBook = (book) => {
    console.log(book);
    this.setState({
      select: book
    })
    this.openModal()
    console.log(this.state.select);
  }


  render() {
    return (
      <div>
        <Header />
        <Tracker />
        <Search bookResults={this.bookResults} />
        <Results displayBookResults={this.state.books} selectBook={this.selectBook} />
        {this.state.isShowing && (
          <div className="modalWrapper">
            <div className="modalHeader">
              <span className="closeModalButton" onClick={this.closeModal}>
                ×
              </span>
            </div>
            <div className="modalBody">
              <h2>s</h2>
              <p>Book Description</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default App;
