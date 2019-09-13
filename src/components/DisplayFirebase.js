import React, { Component } from 'react';
import firebase from 'firebase';

class DisplayFirebase extends Component {
    constructor() {
        super();
        this.state = {
            userReadingList: [],
        }
    }
    //Display the list of guardians from firebase with name and adopted pokemon. 
    renderReadingList() {
        const userReadingListArray = this.state.userReadingList.map((response, i) => {
            return (
                <div key={response.uniqueKey}>
                    <div>
                        <img src={response.Image} alt={response.Title}/>
                        <h2>{response.Title}</h2>
                        <p>{response.Author}</p>
                        <p>{response.Rating}</p>
                    </div>
                    <button onClick={() => this.removeBook(response.uniqueKey)}>Remove book</button>
                </div>
            )
        });
        return (<div>{userReadingListArray}</div>);
    }
    //Displays when there are no guardians save from firebase.
    renderEmptyState() {
        return (
            <div>
                <p>No books in reading list...</p>
            </div>
        )
    }
    removeBook = (bookId) => {
        const dbRef = firebase.database().ref("Name");

        dbRef.child(bookId).remove();

    }
    componentDidMount() {
        const dbRef = firebase.database().ref("Name");

        dbRef.on('value', data => {
            const response = data.val();
            const newState = [];

            for (let key in response) {
                newState.push({
                    Image: response[key].Image,
                    Title: response[key].Title,
                    Author: response[key].Author,
                    Rating: response[key].Rating,
                    uniqueKey: key,
                });
            }
            this.setState({
                userReadingList: newState,
            });
            console.log(this.state.userReadingList);
        });
    }

    render() {
        return (
            <section>
                    <h2>Reading List</h2>
                    <div>
                        {this.state.userReadingList.length ? this.renderReadingList() : this.renderEmptyState()}
                    </div>
            </section>
        )
    }
}

export default DisplayFirebase;