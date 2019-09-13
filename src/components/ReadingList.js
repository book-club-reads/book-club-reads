import React, { Component } from "react";
import firebase from 'firebase';

class ReadingList extends Component {
    constructor(){
        super();
        this.state = {
            bookCollection:[],
        }
    }

    addBookToList = (bookToAdd) => {
        this.setState({
            bookCollection: [...this.state.bookCollection, bookToAdd]
        })
        this.addToFirebase();
    }
    
        addToFirebase = () => {
            const dbRef = firebase.database().ref();
            console.log("Add to firebase");

            dbRef.push({
                Name: "Norre",
                ReadingList: "list" 
            })
        
        };
    
    renderBookCollection = () => {
        console.log("State Collection", this.state.bookCollection);
        const bookCollection = this.state.bookCollection.map((book, i) => {
            return (
                <div key={i}>
                    <div className="bookImages">
                        <img src={book.best_book.image_url} alt="" />
                    </div>
                </div>
            )
        });
        return (<div className="displayBooksContainer">{bookCollection}</div>);
    }  

    //if there is no returned data, render this
    renderEmptyState() {
        return (
            <div>
                <p>No books in your collection</p>
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.addBook && this.props.addBook !== prevProps.addBook) {
            this.addBookToList(this.props.addBook);
    
        }
    }

    render(){
        return(
            <div>
                <h2>Reading Collection</h2>
                <div>
                    {this.state.bookCollection.length ? this.renderBookCollection() : this.renderEmptyState()}
                </div>
            </div>
        )
    }
}
export default ReadingList;