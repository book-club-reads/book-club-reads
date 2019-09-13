import React from "react";

const Modal = props => {
    console.log(props.books);
  return (
    <div className="modalContainer">
      <div className="modalHeader">
        <span className="closeModalButton" onClick={props.close}>
          &#9747;
        </span>
      </div>
      <div className="wrapper">
        <div className="bookDisplay">
          <div className="bookImage">
            <img src={props.img} alt={props.title} />
          </div>
          <div className="modalBody">
            <h2>{props.title}</h2>
            <p>Author: {props.author}</p>
            <p>Rating: {props.rating}</p>
            <button>Add Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
