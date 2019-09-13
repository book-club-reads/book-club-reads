import React, { Component } from "react";
import firebase from 'firebase';

class ReadingList extends Component {
    constructor(){
        super();
        this.state = {
            readingList:[],
        }
    }

    addBookToList = (bookToAdd) => {
        this.setState({
            readingList: [...this.state.readingList, bookToAdd]
        })
        this.addToFirebase(bookToAdd);
    }
    
    addToFirebase = (bookToAddFirebase) => {
        const dbRef = firebase.database().ref("Name");
        console.log("Add to firebase", bookToAddFirebase);

        dbRef.push({
            Book: `${bookToAddFirebase}` 
        })
        
        };
    
    //Deletes book from reading list
    removeBookFromList = (index) => {
        const copiedArray = [...this.state.readingList];

        const newArray = copiedArray.filter((book, i) => {
            return i !== index;
        });

        this.setState({
            readingList: newArray
        })
    }
    renderReadingList= () => {
        console.log("State Collection", this.state.readingList);
        const userReadingList = this.state.readingList.map((book, i) => {
            return (
                <div key={i}>
                    <div className="bookImages">
                        <img src={book.best_book.image_url} alt="" />
                    </div>
                    <button onClick={()=>this.removeBookFromList(i)}>Remove</button>
                </div>
            )
        });
        return (<div className="displayBooksContainer">{userReadingList}</div>);
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
                    {this.state.readingList.length ? this.renderReadingList() : this.renderEmptyState()}
                </div>
            </div>
        )
    }
}
export default ReadingList;