import React, { Component } from "react";
import firebase from "./firebase";
import Header from "./components/Header";
import Tracker from "./components/Tracker";
import Search from "./components/Search";
import Results from "./components/Results";
import Modal from "./components/Modal"
import ReadingList from "./components/ReadingList";
import "./App.scss";
import DisplayFirebase from "./components/DisplayFirebase";

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

componentDidUpdate(){
    if (this.state.select === true) {
      this.selectBook();
    }
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
        <div className="modalContainer">
              <div className="modalHeader">
                <span className="closeModalButton" onClick={this.closeModal}>
                &#9747;
                </span>
              </div>
            <div className="wrapper">
                <div className="bookDisplay">
                  <div className="bookImage">
                    <img src={this.state.select.best_book.image_url} alt=""/>
                  </div>
                <div className="modalBody">
                  <h2>{this.state.select.best_book.title}</h2>
                  <p>Author: {this.state.select.best_book.author.name}</p>
                  <p>Rating: {this.state.select.average_rating}</p>
                  <button>Add Book</button>
                </div>
              </div>
            </div>
        </div>
        )}

        <ReadingList addBook = {this.state.addBook} />
        <DisplayFirebase />
      </div>
    );
  }
}

export default App;