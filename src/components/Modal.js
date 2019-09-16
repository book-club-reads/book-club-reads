import React from "react";
import placeholder  from '../styles/assets/placeholder.jpg';

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
            <img src={props.img === "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png" ? placeholder : props.img} alt={props.title} />
          </div>
          <div className="modalBody">
            <h2>{props.title}</h2>
            <p>Author: {props.author}</p>
            <p>Rating: {props.rating}</p>
            <button onClick={()=>props.addBook(props.selectBook)}>Add Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;