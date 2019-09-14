import React, {Component} from 'react';
//component is used to let user input their reading goal
//also acts as landing page

class Tracker extends Component {
  constructor(){
    super();
    this.state ={
      userInput: {}, //collect the goal and name input fields on form submit
      goalInput: "", //
      nameInput: "",
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const inputObj = {
      name: this.state.nameInput,
      goal: this.state.goalInput,
    }

    this.props.getGoalFn(inputObj)

  }

  inputField = (e,userInput) => {
    const input = {}
    input[userInput] = e.target.value

    this.setState(input)
    console.log(input)
  }


  render() {
    return (
      <section className="tracker">
        <form action="" onSubmit={this.onFormSubmit}>
          <input name="nameInput"
            type="text"
            placeholder="Enter your name"
            value={this.state.nameInput}
            onChange={(e) => {this.inputField(e, "nameInput")}}
          />
          <input name="goalInput"
            type="text"
            placeholder="10"
            pattern="^[1-9][0-9]?$|^100$"
            value={this.state.goalInput}
            onChange={(e) => {this.inputField(e, "goalInput")}}
          />
          <button
            className="submitButton"
            id="submitButton"
            type="submit"
          >
            Set Goal
            </button>
        </form>
      </section>
    )
  }
}

export default Tracker;