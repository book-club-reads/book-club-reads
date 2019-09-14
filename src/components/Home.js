import React, { Component } from 'react';
import Tracker from "../components/Tracker";
// import Search from "../components/Search";
import Results from "../components/Results";
// import Modal from "./components/Modal";
import Modal from "../components/Modal";
import ReadingList from "../components/ReadingList";
// import AddComment from "../components/AddComment"
// import DisplayFirebase from "./components/DisplayFirebase";
import {Link} from 'react-router-dom';


class Home extends Component {
    render() {
        return (
            <div>
                <Tracker getGoalFn={this.goalFormSubmit} />
                {/* <Search bookResults={this.props.appBookResults} /> */}
                <Results displayBookResults={this.props.fullState.books}
                    selectBook={this.props.appSelectBook} />
                {this.props.fullState.isShowing && (
                    <Modal
                        close={this.props.appCloseModal}
                        img={this.props.fullState.select.best_book.image_url}
                        title={this.props.fullState.select.best_book.title}
                        author={this.props.fullState.select.best_book.author.name}
                        rating={this.props.fullState.select.average_rating}
                        alt={this.props.fullState.select.best_book.title}
                        addBook={this.props.appAddBook}
                        selectBook={this.props.fullState.select}
                    />
                )}
                <ReadingList addBook={this.props.fullState.addBook} />
                <Link to="/bookshelf">Bookshelf</Link>
                {/* <AddComment comment={this.props.fullState.commentBookId} /> */}
            </div>
        )
    }
}
export default Home;