import React from "react";
import placeholder from '../styles/assets/placeholder.jpg';
class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      addShowing: true,
      addedShowing: false
    }
  }

  buttonSwitch = () => {
    this.setState({
      addedShowing: true,
      addShowing: false
    })
  }

  render() {
    return (
      <div className="modal">
        <div className="modalContainer">
          <div className="modalHeader">
            <span
              className="closeModalButton"
              onClick={this.props.close}
            >
              &#9747;
            </span>
          </div>
          <div className="wrapper">
            <div className="bookDisplay">
              <div className="bookImage">
                <img
                  src={
                    this.props.img ===
                      "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png"
                      ? placeholder
                      : this.props.img
                  }
                  alt={this.props.title}
                />
              </div>
              <div className="modalBody">
                <h2>{this.props.title}</h2>
                <p>Author: {this.props.author}</p>
                <p>Rating: {this.props.rating}</p>
                {this.state.addShowing &&
                  <button
                    onClick={() => { this.props.addBook(this.props.selectBook); this.buttonSwitch() }
                    }
                  >
                    Add Book
                  </button>
                }
                {this.state.addedShowing && <button>Added</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Modal;