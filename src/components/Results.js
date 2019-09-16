import React, { Component } from "react";
import DisplayFirebase from "./DisplayFirebase";


class Results extends Component {
  
  //display the search results
  renderDisplayBooks = () => {
    const bookList = this.props.displayBookResults.map((book, i) => {
      return (
        <div key={i}>
          <div className="bookImages" onClick={() => {this.props.selectBook(book)}}>

            <img src={book.best_book.image_url} alt="" />
          </div>
        </div>
      );
    });
    return <div className="displayBooksContainer">{bookList}</div>;
  };

  //if there is no returned data, render t
  renderEmptyState() {
    return (
      <div>
        <p>Add books to your collection</p>
      </div>
    );
  }

  componentDidMount() {
    this.renderDisplayBooks()
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
          ({this.props.displayBookResults.length
               ? this.renderDisplayBooks()
               : this.renderEmptyState()})
          }
          {this.props.booklistShowing && (<DisplayFirebase/>)}
          {/* {this.props.resultsShowing && (this.renderDisplayBooks())} */}
        </div>
      </section>
    );
  }
}

export default Results;
