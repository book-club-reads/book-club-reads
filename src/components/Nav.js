import React, { Component } from 'react'

class Nav extends Component {
    render() {
        return (
          <div>
            <nav>
              <ul className="buttonList">
                <li>
                  <button onClick={this.props.bookshelfPage}>My Bookshelf</button>
                </li>
                <li>
                  <button onClick={this.props.searchPage}>Search Results</button>
                </li>
              </ul>
            </nav>
          </div>
        );
    }
}

export default Nav
