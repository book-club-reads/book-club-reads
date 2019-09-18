import React, { Component } from 'react';
import firebase from 'firebase';
import AddComment from './AddComment';
import GoalPercent from './GoalPercent';
import placeholder from '../styles/assets/placeholder.jpg'

class DisplayFirebase extends Component {
  constructor() {
    super();
    this.state = {
      userReadingList: [],
      read: 0,
      userGoal: {},
      commentBookId: ''
    };
  }
  
  //Display the list of books in the reading list
  renderReadingList() {
    const userReadingListArray = this.state.userReadingList.map(
      (response, i) => {
        return (
          <div key={response.uniqueKey} className="booklistContent">
            <div className="bookDetails">
              <img
                src={
                  response.Image ===
                  "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png"
                    ? placeholder
                    : response.Image
                }
                alt={response.Title}
              />
              <div className="bookDetailsText">
                <p className="bookNameResults shelfStyle">{response.Title}</p>
                <p className="authorNameResults shelfStyle">{response.Author}</p>
                <p className="authorNameResults shelfStyle">Rating: {response.Rating}</p>
              </div>
            </div>
            <div className="">
              {response.Comment
                ? this.renderComment(response.Comment)
                : this.renderNoComment()}
            </div>

              <div className="booklistButtons">
                {response.Read === false ? (
                  <button
                    onClick={() => {
                      this.handleRead(response.uniqueKey);
                    }}
                  >
                    Mark as Read
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.handleUnread(response.uniqueKey);
                    }}
                  >
                    Mark as Unread
                  </button>
                )}
              <button onClick={() => this.handleComment(response.uniqueKey)}>
                Post Comment
              </button>
              <button onClick={() => this.removeBook(response.uniqueKey)}>
                Remove book
              </button>
              </div>
          </div>
        );
      }
    );
    return <div className="">{userReadingListArray}</div>;
  }

  //Function to run when user clicks read button
  handleRead = bookId => {
    const addRead = this.state.read + 1
    this.setState({
      read: addRead
    });
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
    const minusRead = this.state.read - 1
    this.setState({
      read: minusRead
    });
    const dbRef = firebase
      .database()
      .ref("Name")
      .child(`${bookId}`);

    dbRef.update({
      Read: false
    });
  };

  handleComment = bookId => {
    this.setState({
      commentBookId: bookId
    });
  };

  //Display of user comments on book
  renderComment(comment) {
    return (
      <div>
        <p className="commentDisplay">"{comment}"</p>
      </div>
    );
  }

  //Display no comment
  renderNoComment() {
    return (
      <div>
        <p className="commentDisplay">No comment on this book</p>
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

  //Gets user goal from Results.js
  getUserGoal = () => {
    this.setState({
      userGoal: this.props.userGoal
    })
  }

  //Function to pull all reading list from firebase
  readingListFromFirebase = () => {
    const dbRef = firebase.database().ref("Name");

    dbRef.on("value", data => {
      const response = data.val();
      const newState = [];
      let readCounter = 0
      
      for (let key in response) {
        if (response[key].Read === true) {
          readCounter = readCounter + 1
        } 
        newState.push({
          Image: response[key].Image,
          Title: response[key].Title,
          Author: response[key].Author,
          Rating: response[key].Rating,
          uniqueKey: key,
          Comment: response[key].Comment,
          Read: response[key].Read,
          BookId: response[key].BookId
        });
      }
      this.setState({
        userReadingList: newState,
        read: readCounter
      });
    });
  }

  componentDidMount() {
    this.readingListFromFirebase();
    this.getUserGoal();
  }

  render() {
    return (
      <section className="">
        <div>
          <GoalPercent read={this.state.read} userGoal={this.state.userGoal} />
          {this.state.userReadingList.length
            ? this.renderReadingList()
            : this.renderEmptyState()}
        </div>
        <AddComment comment={this.state.commentBookId} />
      </section>
    );
  }
}

export default DisplayFirebase;