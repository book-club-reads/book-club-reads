import React, { Component } from 'react';

class Results extends Component {

renderDisplayBooks = () => {
  const bookList = this.props.displayBooks.map((book, i) => {
    return (
      <div key={i}>
        <div className="bookImages">
          <img src={book.best_book.image_url} alt=""/>
        </div>
      </div>
    )
  });
  return (<div className="displayBooksContainer">{bookList}</div>);
}  

renderEmptyState(){
  return(
    <div>
      <p>Add books to your collection</p>
    </div>
  )
}

componentDidMount(){
  this.renderDisplayBooks()
}

  render(){
    return(
      <div>
        <div className="displayBackground">
          <h2 className=""> Results</h2>
          <div>
            {this.props.displayBooks.length ? this.renderDisplayBooks() : this.renderEmptyState()}
          </div>
        </div>
      </div>
    )
}


  
  
} 

export default Results;