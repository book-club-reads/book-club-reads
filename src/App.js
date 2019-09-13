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
  //goal tracker form fn to get user's reading goal
  goalFormSubmit = (e, goal) => {
    e.preventDefault();
    this.setState({
      userGoal: goal,
    })
    console.log(this.state.userGoal);
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
        <DisplayFirebase />
      </div>
    );
  }
}

export default App;