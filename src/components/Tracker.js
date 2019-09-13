import React, {Component} from 'react';
//component is used to let user input their reading goal
//also acts as landing page

class Tracker extends Component {
  constructor(){
    super();
    this.state ={
      goalInput: "",
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onGoalInput = (event) => {
    this.setState({
      goalInput: event.target.value
    })	
  }


  render() {
    return (
      <form action="" onSubmit={this.onFormSubmit}>
        <input name="goalInput"
          type="text"
          onChange={this.onGoalInput}
          value={this.state.goalInput}
          placeholder="10"
          pattern="^[1-9][0-9]?$|^100$"
        />
        <button
          className="submitButton"
          id="submitButton"
          type="submit"
        >
          Set Goal
          </button>
      </form>
    )
  }
}

export default Tracker;