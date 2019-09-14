import React, { Component } from "react";
import firebase from "./firebase";
import Header from "./components/Header";
import Tracker from "./components/Tracker";
import Results from "./components/Results";
import Modal from "./components/Modal";
import ReadingList from "./components/ReadingList";
import "./styles/App.scss";
import DisplayFirebase from "./components/DisplayFirebase";
import AddComment from "./components/AddComment"
import {
  BrowserRouter 
  as Router, 
  Route, Link } 
  from 'react-router-dom';
  import Home from './components/Home';
  

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

  //user input from search field
  bookResults = searchBooks => {
    this.setState({
      books: searchBooks
    });
    console.log("state books", this.state.books);
  };
  //on page load, make search form disappear
  //once we receive user's name and goal input, display a line of text in main area, and display search form
  //once we receive user's input into search form, clear the line of text in main area
  //display the search result into main area



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
          <Header appBookResults={this.bookResults}/>
          <Tracker />
          <Results displayBookResults={this.state.books}        
                  selectBook={this.selectBook} />
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

