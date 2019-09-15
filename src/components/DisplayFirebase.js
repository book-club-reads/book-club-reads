import React, { Component } from 'react';
import firebase from 'firebase';


class DisplayFirebase extends Component {
  constructor() {
    super();
    this.state = {
      userReadingList: [],
      read: 0
    };
  }
  //Display the list of books in the reading list
  renderReadingList() {
    const userReadingListArray = this.state.userReadingList.map(
      (response, i) => {
        return (
          <div key={response.uniqueKey} className="displayBooksContent">
            <div>
              <img src={response.Image} alt={response.Title} />
              <h2>{response.Title}</h2>
              <p>{response.Author}</p>
              <p>{response.Rating}</p>
              <div>
                {response.Comment
                  ? this.renderComment(response.Comment)
                  : this.renderNoComment()}
              </div>
              <div>
                {response.Read === false ? (
                  <button
                    onClick={() => {
                      this.handleRead(response.uniqueKey);
                    }}
                  >
                    Read
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.handleUnread(response.uniqueKey);
                    }}
                  >
                    unRead
                  </button>
                )}
              </div>
            </div>

            <button onClick={() => this.props.addComment(response.uniqueKey)}>
              Post Comment
            </button>
            <button onClick={() => this.removeBook(response.uniqueKey)}>
              Remove book
            </button>
          </div>
        );
      }
    );
    return <div className="displayBooksContainer">{userReadingListArray}</div>;
  }
  //Adds selected book to firebase
  addToFirebase = bookToAddFirebase => {
    const dbRef = firebase.database().ref("Name");
    console.log("Add to firebase", bookToAddFirebase);

    dbRef.push({
      Image: bookToAddFirebase.best_book.image_url,
      Title: bookToAddFirebase.best_book.title,
      Author: bookToAddFirebase.best_book.author.name,
      Rating: bookToAddFirebase.average_rating,
      Read: false
    });
  };

  //Function to run when user clicks read button
  handleRead = bookId => {
    this.setState({
      read: this.state.read + 1
    });
    console.log("Read click", bookId);
    const dbRef = firebase
      .database()
      .ref("Name")
      .child(`${bookId}`);

    dbRef.update({
      Read: true
    });
  };

  //Function to run when user clicks unread button
  handleUnread = bookId => {
    this.setState({
      read: this.state.read - 1
    });
    console.log("unRead click", bookId);
    const dbRef = firebase
      .database()
      .ref("Name")
      .child(`${bookId}`);

    dbRef.update({
      Read: false
    });
  };
  //Display of user comments on book
  renderComment(comment) {
    return (
      <div>
        <p>{comment}</p>
      </div>
    );
  }
  //Display no comment
  renderNoComment() {
    return (
      <div>
        <p>No comment on this book</p>
      </div>
    );
  }
  //Displays when there are no guardians save from firebase.
  renderEmptyState() {
    return (
      <div>
        <p>No books in reading list...</p>
      </div>
    );
  }
  //Remove book from firebase
  removeBook = bookId => {
    const dbRef = firebase.database().ref("Name");

    dbRef.child(bookId).remove();
  };


  componentDidMount() {
    const dbRef = firebase.database().ref("Name");

    dbRef.on("value", data => {
      const response = data.val();
      const newState = [];

      for (let key in response) {
        newState.push({
          Image: response[key].Image,
          Title: response[key].Title,
          Author: response[key].Author,
          Rating: response[key].Rating,
          uniqueKey: key,
          Comment: response[key].Comment,
          Read: response[key].Read
        });
      }
      this.setState({
        userReadingList: newState
      });
      console.log(this.state.userReadingList);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.addBook && this.props.addBook !== prevProps.addBook) {
      this.addToFirebase(this.props.addBook);
    }
  }

  render() {
    return (
        <section className="displayBooksContainer">
          <h2>Reading List</h2>
          <div>
            {this.state.userReadingList.length
              ? this.renderReadingList()
              : this.renderEmptyState()}
          </div>
        </section>
    );
  }
}

export default DisplayFirebase;