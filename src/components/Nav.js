import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul className="buttonList">
            <li>
              <Link to="/">
                <button>Home</button>
              </Link>
            </li>
            <li>
              <button onClick={this.props.bookshelfPage}>Bookshelf</button>
            </li>
            <li>
              <button onClick={this.props.searchPage}>Search</button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav
