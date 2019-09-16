import React, { Component } from "react";
import placeholder from '../styles/assets/placeholder.jpg'; 
import DisplayFirebase from "./DisplayFirebase";


class Results extends Component {
  constructor(){
    super();
    this.state = ({
      userGoal: {}
    })
  }
  
  //display the search results
  renderDisplayBooks = () => {
    const bookList = this.props.displayBookResults.map((book, i) => {
      
      return (
        <div key={i} className="resultsBlock">
          
          <div className="bookImages" onClick={() => {this.props.selectBook(book)}}>

            <img src={book.best_book.image_url === "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png" ? placeholder : book.best_book.image_url  } alt={book.best_book.title} />
            <p className="bookNameResults">{book.best_book.title}</p>
            <p className="authorNameResults">{book.best_book.author.name}</p>
          </div>
        </div>
      );
    });
    // return <div className="displayBooksContainer">{bookList}</div>;
    return bookList;
  };

  //if there is no returned data, render t
  renderEmptyState() {
    return (
      <div>
        <p>Add books to your collection</p>
      </div>
    );
  }

  //Gets user goal from App.js
  getUserGoal = () => {
    this.setState({
      userGoal: this.props.userGoal
    })
  }

  componentDidMount() {
    this.renderDisplayBooks()
    this.getUserGoal()
  }

  render(){
    return(
      // <div>
      //   <div className="displayBackground">
      //     <h2 className=""> Results</h2>
      //     <div>
      //       {this.props.displayBookResults.length
      //         ? this.renderDisplayBooks()
      //         : this.renderEmptyState()}
      //     </div>
      //   </div>
      // </div>
      <section className="tracker">
        <div className="formOverlay">
          {this.props.resultsShowing &&
            (this.props.displayBookResults.length
              ? this.renderDisplayBooks()
              : this.renderEmptyState())
          }
          {this.props.booklistShowing && (<DisplayFirebase userGoal = {this.state.userGoal} />)}

        </div>
      </section>
    );
  }
}

export default Results;
