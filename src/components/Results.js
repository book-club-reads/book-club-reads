import React, { Component } from "react";
import placeholder from '../styles/assets/placeholder.jpg'; 
import DisplayFirebase from "./DisplayFirebase";
import Modal from "./Modal";
import firebase from "firebase";


class Results extends Component {
  constructor() {
    super();
    this.state = {
      userGoal: {},
      modalShowing: false,
      select: "",
      addBook: ""
    };
  }

  //display the search results
  renderDisplayBooks = () => {
    const bookList = this.props.displayBookResults.map((book, i) => {
      return (
        <div key={i} className="resultsBlock">
          <div
            className="bookImages"
            onClick={() => {
              this.selectBook(book);
            }}
          >
            <img
              src={
                book.best_book.image_url ===
                "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png"
                  ? placeholder
                  : book.best_book.image_url
              }
              alt={book.best_book.title}
            />
            <p className="bookNameResults">{book.best_book.title}</p>
            <p className="authorNameResults">{book.best_book.author.name}</p>
          </div>
        </div>
      );
    });
    return bookList;
  };

  //if there is no returned data, render empty message
  renderEmptyState() {
    return (
      <div>
        <p>Add books to your collection</p>
      </div>
    );
  }
  //-------------------MODAL------------------------
  //Handle selected book details to pop as modal
  selectBook = book => {
    this.setState({
      select: book
    });
    this.openModal();
  };

  openModal = books => {
    this.setState({
      modalShowing: true
    });
  };

  closeModal = () => {
    this.setState({
      modalShowing: false
    });
  };

  //Handle selected book details to pop as modal
  selectBook = book => {
    console.log(book);
    this.setState({
      select: book
    });
    this.openModal();
    console.log(this.state.select);
  };
  //-------------------ADD BOOK------------------------
  //Add book to reading list
  addBook = bookToAdd => {
    console.log("bookToAdd", bookToAdd);

    let bookIdArray = []

    //Gets the book id
    bookIdArray = Object.values(bookToAdd.id)
    const bookId = bookIdArray[1]

    this.setState({
      addBook: bookToAdd
    });
    const dbRef = firebase.database().ref("Name");
    console.log(bookToAdd.best_book.image_url);
    dbRef.push({
      Image: bookToAdd.best_book.image_url,
      Title: bookToAdd.best_book.title,
      Author: bookToAdd.best_book.author.name,
      Rating: bookToAdd.average_rating,
      Read: false,
      BookId: bookId
    });
  };
  //-------------------READING GOAL------------------------
  //Gets user goal from App.js
  getUserGoal = () => {
    this.setState({
      userGoal: this.props.userGoal
    });
  };
  //-------------------DISPLAY BOOKSHELF OR SEARCH------------------------
  bookshelfPage = () => {
    this.setState({
      resultsShowing: false,
      booklistShowing: true
    });
  };

  // function to change state to render search page instead of bookshelf page
  searchPage = () => {
    this.setState({
      resultsShowing: true,
      booklistShowing: false
    });
  };

  componentDidMount() {
    this.renderDisplayBooks();
    this.getUserGoal();
  }

  componentDidUpdate() {
    if (this.state.select === true) {
      this.selectBook();
    }
  }

  render() {
    return (

      <section className="tracker">
        <div className="formOverlay">
          {this.props.resultsShowing &&
            (this.props.displayBookResults.length
              ? this.renderDisplayBooks()
              : this.renderEmptyState())}
          {this.props.booklistShowing && (
            <DisplayFirebase
              userGoal={this.state.userGoal}
              addBook={this.state.addBook}
            />
          )}
          {this.state.modalShowing && (
            <Modal
              close={this.closeModal}
              img={this.state.select.best_book.image_url}
              title={this.state.select.best_book.title}
              author={this.state.select.best_book.author.name}
              rating={this.state.select.average_rating}
              alt={this.state.select.best_book.title}
              addBook={this.addBook}
              selectBook={this.state.select}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Results;
