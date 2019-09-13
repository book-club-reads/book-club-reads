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
      select: '1',
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

  render() {
    return (
      <div>
        <Header />
        <Tracker getGoalFn={this.goalFormSubmit}/>
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
