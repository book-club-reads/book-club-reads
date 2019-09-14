import React, { Component } from "react";
import firebase from "./firebase";
import Header from "./components/Header";
import Tracker from "./components/Tracker";
import Search from "./components/Search";
import Results from "./components/Results";
import Modal from "./components/Modal"
import ReadingList from "./components/ReadingList";
import "./styles/App.scss";
import DisplayFirebase from "./components/DisplayFirebase";
import AddComment from "./components/AddComment"

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      isShowing: false,
      select: '',
      addBook: '',
      commentBookId: '',
      userGoal: {},
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
  //Handle selected book details to pop as modal
  selectBook = (book) => {
    console.log(book);
    this.setState({
      select: book
    })
    this.openModal()
    console.log(this.state.select);
  }
  
  //goal tracker form fn to get user's reading goal
  goalFormSubmit = (goalInput) => {
    console.log(goalInput);

    this.setState({
      userGoal: goalInput,
    })

  }
  
  //Add book to reading list
  addBook = bookToAdd => {
    console.log("bookToAdd", bookToAdd);
    this.setState ({
      addBook: bookToAdd
    })
  }
  
  handleComment = (bookId) => {
    this.setState({
      commentBookId: bookId
    })
    console.log("handle comment", bookId);
  }

  componentDidUpdate() {
    if (this.state.select === true) {
      this.selectBook();
    }
  }


  render() {
    return (
      <div>
        <Header />
        <Tracker getGoalFn={this.goalFormSubmit}/>
        <Search bookResults={this.bookResults} />
        <Results displayBookResults={this.state.books}        selectBook={this.selectBook} />
        {this.state.isShowing && (
        <Modal
            close={this.closeModal}
            img={this.state.select.best_book.image_url}
            title={this.state.select.best_book.title}
            author={this.state.select.best_book.author.name}
            rating={this.state.select.average_rating}
            alt={this.state.select.best_book.title}
            addBook={this.addBook}
            selectBook = {this.state.select}
        />
        )}
        <ReadingList addBook = {this.state.addBook} />
        <DisplayFirebase addComment = {this.handleComment}/>
        <AddComment comment = {this.state.commentBookId}/>
      </div>
    );
  }
}

export default App;