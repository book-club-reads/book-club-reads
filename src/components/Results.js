import React, { Component } from "react";


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
<<<<<<< HEAD
      <div>
        <p>Add books to your collection</p>
=======
      <div key={i}>
        <div className="bookImages"
              onClick={()=>this.props.addBook(book)}
        >
          <img src={book.best_book.image_url} alt=""/>
        </div>
>>>>>>> 0355ffb56e4601b0df0fa14e166ba448992e9b5c
      </div>
    );
  }

<<<<<<< HEAD
  componentDidMount() {
    this.renderDisplayBooks()
  }
=======

componentDidMount(){
  this.renderDisplayBooks()

  // dbRef.on('value', (data) => {

  //   //grab the data from FB, return an object
  //   data = data.val();

  //   //go through this object, and turn it into an array 
  //   console.log(data)

  // })
}
>>>>>>> 0355ffb56e4601b0df0fa14e166ba448992e9b5c

  render(){
    return(
      <div>
        <div className="displayBackground">
          <h2 className=""> Results</h2>
          <div>
<<<<<<< HEAD
            {this.props.displayBookResults.length
              ? this.renderDisplayBooks()
              : this.renderEmptyState()}
=======
            {this.props.displayBookResults.length ? this.renderDisplayBooks() : this.renderEmptyState()}
>>>>>>> 0355ffb56e4601b0df0fa14e166ba448992e9b5c
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
