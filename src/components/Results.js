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
      addBook: "",
      fbBookIdArray: []
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
    // return <div className="displayBooksContainer">{bookList}</div>;
    return bookList;
  };

  //if there is no returned data, render t
  renderEmptyState() {
    return (
      <div>
        <p>Add books to your collection</p>
      </div>
    );
  }

  //Handle selected book details to pop as modal
  selectBook = book => {
    this.setState({
      select: book
    });
    this.openModal();
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


  //Gets user goal from App.js
  getUserGoal = () => {
    this.setState({
      userGoal: this.props.userGoal
    });
  };
  
  //Stores all the book id from reading list into an aray
  getFbBookId = () => {
      const dbRef = firebase.database().ref("Name");

      dbRef.on("value", data => {
        const response = data.val();
        const newState = []
       
        for (let key in response) {
          newState.push(response[key].BookId)
        }
        this.setState({
          fbBookIdArray: newState
        })        
      });
  }

  //Function  to check if book was already added in the list
  checkDuplicate = (bookToCheckDuplicate) => {
    let checkDuplicateId = [];
    checkDuplicateId = Object.values(bookToCheckDuplicate.id)

    const checkBookId = checkDuplicateId[1]
    
    const copiedArray = this.state.fbBookIdArray
    console.log("checkBookId", checkBookId);
    
    if (copiedArray.includes(`${checkBookId}`)) {
      alert('You already added this book')
    } else {
      this.addBook(bookToCheckDuplicate);
    }
  }
  
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
    
    dbRef.push({
      Image: bookToAdd.best_book.image_url,
      Title: bookToAdd.best_book.title,
      Author: bookToAdd.best_book.author.name,
      Rating: bookToAdd.average_rating,
      Read: false,
      BookId: bookId
    });
  };

  componentDidMount() {
    this.renderDisplayBooks();
    this.getUserGoal();
    this.getFbBookId();
  }

  componentDidUpdate() {
    if (this.state.select === true) {
      this.selectBook();
    }
  }

  render() {
    console.log("this.state.fbBookIdArray", this.state.fbBookIdArray);
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
              addBook={this.checkDuplicate}
              selectBook={this.state.select}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Results;
