import React, { Component } from 'react';
import books from '../styles/assets/book-logo.png';
import Search from "../components/Search";

class Header extends Component {
  constructor() {
    super();
    this.state={
      books: [],
    }
  }
  
  render() {
    return (
      <header>
        <div className="title">
          <div className="logo">
            <img src={books} alt="Logo with books"/>
          </div>
          <h1>Book Club Reads</h1>
        </div>
        <Search bookResults={this.props.appBookResults} />
      </header>
    )
  }
}

export default Header