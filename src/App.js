import React, { Component } from "react";
import firebase from "./firebase";
import Header from "./components/Header";
import Tracker from "./components/Tracker";
import Search from "./components/Search";
import Results from "./components/Results";
import Modal from "./components/Modal"
import ReadingList from "./components/ReadingList";
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      isShowing: false,
      select: '',
      addBook: ''
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (data) => {

      //grab the data from FB, return an object
      data = data.val();

      //go through this object, and turn it into an array 
      console.log(data)

    })
  }

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


  addBook = bookToAdd => {
    console.log("bookToAdd", bookToAdd);
    this.setState ({
      addBook: bookToAdd
    })
  }

  componentDidUpdate() {
    if (this.state.select === true) {
      this.selectBook();
    }
  }

  render() {
    console.log("AddBook", this.state.addBook);
    return (
      <div>
        <Header />
        <Tracker />
        <Search bookResults={this.bookResults} />
        <Results displayBookResults={this.state.books}        selectBook={this.selectBook} />
        {this.state.isShowing && (
          <div className="modalWrapper">
            <div className="modalHeader">
              <span className="closeModalButton" onClick={this.closeModal}>
                ×
              </span>
            </div>
            <div className="modalBody">
              <img src={this.state.select.best_book.image_url} alt="" />
              <h2>{this.state.select.best_book.title}</h2>
              <p>Author: {this.state.select.best_book.author.name}</p>
              <p>Rating: {this.state.select.average_rating}</p>
              <p>Book Description</p>
              <button onClick={() => this.addBook(this.state.select)}>Add Book</button>
            </div>
          </div>
        )}

        <ReadingList addBook = {this.state.addBook} />
      </div>
    );
  }
}
export default App;
