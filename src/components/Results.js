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
      isShowing: false,
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
    return <div className="displayBooksContainer">{bookList}</div>;
  };

  //if there is no returned data, render t
  renderEmptyState() {
    return (
      <div>
        <p>Add books to your collection</p>
      </div>
    );
  }

  //Gets user goal from App.js
  getUserGoal = () => {
    this.setState({
      userGoal: this.props.userGoal
    });
  };
  openModal = books => {
    this.setState({
      isShowing: true
    });
  };

  closeModal = () => {
    this.setState({
      isShowing: false
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

  //Add book to reading list
  addBook = bookToAdd => {
    console.log("bookToAdd", bookToAdd);
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
      Read: false
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
      // <div>
      //   <div className="displayBackground">
      //     <h2 className=""> Results</h2>
      //     <div>
      //       {this.props.displayBookResults.length
      //         ? this.renderDisplayBooks()
      //         : this.renderEmptyState()}
      //     </div>
      //   </div>
      // </div>
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
          {this.state.isShowing && (
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
