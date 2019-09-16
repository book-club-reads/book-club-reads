import React, { Component } from 'react';
import firebase from 'firebase';

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isShowing: false
        };
    }
    
    openModal = (books) => {
        this.setState({
            isShowing: true
        })
    };

    closeModal = () => {
        this.setState({
            isShowing: false
        })
    }
    handleChange = (event) => {
        this.setState({ 
            value: event.target.value 
        });
        this.openModal();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const bookId = this.props.comment
        const dbRef = firebase.database().ref("Name").child(`${bookId}`)

        dbRef.update({
            Comment: this.state.value
        })
        this.setState({
            value: ''
        })
        this.closeModal();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.comment && this.props.comment !== prevProps.comment) {
            this.openModal();
        }
    }
    render() {
        return (
            <div>
            { this.state.isShowing && (
            <div className="formModalContainer">
                <div className="modalHeader">
                    <span className="closeModalButton" onClick={this.closeModal}>
                        &#9747;
        </span>
                </div>
                <div className="wrapper">
                        <form className="formFlex" onSubmit={this.handleSubmit}>
                            <label>Add Comment</label>
            <textarea value={this.state.value} onChange={this.handleChange} rows={10} cols={5} placeholder="Add comments to the book" />
                            <input type="submit" value="Post Comment" />
                        </form>
                </div>
            </div> 
            )}
            </div>
        );
    }
}

export default AddComment;