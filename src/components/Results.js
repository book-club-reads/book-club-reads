import React, { Component } from "react";
<<<<<<< HEAD
import placeholder from '../styles/assets/placeholder.jpg'; 
=======
import DisplayFirebase from "./DisplayFirebase";
>>>>>>> working-branch


class Results extends Component {
  
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
<<<<<<< HEAD
      <div>
        <div className="displayBackground">
          <h2 className=""> Results</h2>
          <div>
            
            
            {this.props.displayBookResults.length
=======
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
>>>>>>> working-branch
              ? this.renderDisplayBooks()
              : this.renderEmptyState())
          }
          {this.props.booklistShowing && (<DisplayFirebase/>)}

        </div>
      </section>
    );
  }
}

export default Results;
