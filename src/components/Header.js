import React, { Component } from 'react';
import books from '../styles/assets/book-logo.png';

class Header extends Component {


  render() {
    return (
      <header>
        <div className="logo">
          <img src={books} alt="Logo with books"/>
        </div>
        <h1>Book Club Reads</h1>
      </header>
    )
  }
}

export default Header