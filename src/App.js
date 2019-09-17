import React, { Component } from "react";
import firebase from "./firebase";
import Header from "./components/Header";
import Nav from './components/Nav';
import Tracker from "./components/Tracker";
import Results from "./components/Results";
import Modal from "./components/Modal";
import "./styles/App.scss";
// import DisplayFirebase from "./components/DisplayFirebase";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      isShowing: false,
      resultsShowing: true,
      booklistShowing: false,
      select: "",
      addBook: "",
      commentBookId: "",
      userGoal: {}
    };
  }

  //user input from search field
  bookResults = searchBooks => {
    this.setState({
      books: searchBooks,
    });
    this.searchPage();
  };
  //on page load, make search form disappear
  //once we receive user's name and goal input, display a line of text in main area, and display search form
  //once we receive user's input into search form, clear the line of text in main area
  //display the search result into main area


  //goal tracker form fn to get user's reading goal
  goalFormSubmit = (goalInput) => {
    this.setState({
      userGoal: goalInput
    });
  };

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
      booklistShowing:false
    });
  };

  render() {
    return (
      <Router>
        <Route exact path='/' render={()=>{
          return(
          <div>
            <Tracker
              getGoalFn={this.goalFormSubmit}
              searchOn={this.state.searchOn}
            />
          </div>
          );
        }}/>
  
        <Route exact path='/search' render={() => {
          return (
            <div>
            <Header appBookResults={this.bookResults} />
            <Nav bookshelfPage={this.bookshelfPage} 
              searchPage={this.searchPage}/>
             <Results
              displayBookResults={this.state.books}
              selectBook={this.selectBook}
              resultsShowing={this.state.resultsShowing}
              booklistShowing={this.state.booklistShowing}
              userGoal={this.state.userGoal}
            />
            </div>
            );
       }}
       />
        
    </Router>
    )}
}

export default App;

 