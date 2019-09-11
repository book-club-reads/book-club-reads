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


  
export default App;
 books = {this.state.books} 