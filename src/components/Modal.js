import React from "react";

const Modal = props => {
    console.log(props.books);
  return (
    <div>
      <div className="modalWrapper">
        <div className="modalHeader">
          <span className="closeModalButton" onClick={props.close}>
            ×
          </span>
        </div>
        <div className="modalBody">
            {/* <p>{props.books[0].best_book.title}</p> */}
            <h2>Book Title</h2>
            <p>book Description</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
