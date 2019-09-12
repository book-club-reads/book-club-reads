import React, { Component } from 'react';
import firebase from './firebase';
import Header from './components/Header';
import Search from './components/Search';
import Results from './components/Results';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
    }
  }

  //app.js: write a function to tell search.js to do something
  //const result = searchFn()
  //pass result to Result.js to render

  userBooks = (searchBooks) => {
    console.log("Search books", searchBooks);
    const newBookState = []
    searchBooks.map((book) => {
      newBookState.push(book)
      console.log("book", book)

    });

    this.setState ({
      books: newBookState
    })

    console.log("state books", this.state.books);
  }
  render() {
    return (
      <div>
        <Header />
        <Search searchBooksArray = {this.userBooks} />
        <Results displayBooks = {this.state.books} />
      </div>
    )
  }



} 
export default App;
 