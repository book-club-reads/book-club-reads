import React, { Component } from 'react';
import firebase from 'firebase';

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const bookId = this.props.comment
        console.log("Add to firebase", bookId);
        const dbRef = firebase.database().ref("Name").child(`${bookId}`)

        dbRef.update({
            Comment: this.state.value
        })
        this.setState({
            value: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Add Comment
          <textarea value={this.state.value} onChange={this.handleChange} rows={5} cols={30} placeholder="Add comments to the book"/>
                </label>
                <input type="submit" value="Submit" />

            </form>
        );
    }
}

// class AddComments extends Component {
//     constructor() {
//         super();
//         this.state = {
//             userComment: "",
//         }
//     }

//     // onFormSubmit = (e) => {
//     //   e.preventDefault();
//     //   this.setState({
//     //     [e.target.name]: e.target.value
//     //   })
//     // }

//     handleAddComment = (event) => {
//         this.setState({
//             [event.target.name]: event.target.value
//         })
//     }

//     postComment = () => {
        
//     }
//     componentDidUpdate(prevProps, prevState){
//         if (this.props.comment && this.props.comment !== prevProps.comment) {
//             this.postComment();
//         } 
//     }


//     render(){
//         return(
//             <form>
//                 <fieldset>
//                     <legend>Add Comment</legend>
//                         <p>
//                             <label>Text Area</label>
//                             <textarea> id = "myTextArea"
//                                     rows = "3"
//                                     cols = "80"
//                                     >Your text here
//                             </textarea>
//                         </p>
//                 </fieldset>
//             </form>
//             // <form action="" onSubmit={() => this.postComment}>
//             //     <input name="goalInput"
//             //         type="textarea"
//             //         onChange={this.handleAddComment}
//             //         value={this.state.userComment}
//             //         placeholder="Add comment"
//             //         rows="4" cols="50"
//             //         // pattern="^[1-9][0-9]?$|^100$"
//             //     />
//             //     <button
//             //         className="submitButton"
//             //         id="submitButton"
//             //         type="submit"

//             //     >
//             //         Post Comment
//             // </button>
//             // </form>
//         )
//     }
// }
export default AddComment;