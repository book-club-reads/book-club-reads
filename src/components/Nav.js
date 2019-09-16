import React, { Component } from 'react'

class Nav extends Component {
    render() {
        return (
          <div>
            <nav>
              <ul>
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
