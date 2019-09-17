import React, { Component } from "react";
import firebase from "./firebase";
import Header from "./components/Header";
import Nav from './components/Nav';
import Tracker from "./components/Tracker";
import Results from "./components/Results";
import "./styles/App.scss";
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

  //User input from search field
  bookResults = searchBooks => {
    this.setState({
      books: searchBooks,
    });
    this.searchPage();
  };

  //Goal tracker form fn to get user's reading goal
  goalFormSubmit = (goalInput) => {
    this.setState({
      userGoal: goalInput
    });
    const dbRef = firebase.database().ref("Name");
    dbRef.remove()
    this.searchPage();
  };

  bookshelfPage = () => {
    this.setState({
      resultsShowing: false,
      booklistShowing: true
    });
  };
  

  // Function to change state to render search page instead of bookshelf page
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