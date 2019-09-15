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
      goalSubmit: true,
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.setState({
      goalSubmit: false,
    })

    const inputObj = {
      name: this.state.nameInput,
      goal: this.state.goalInput,
    }

    this.props.getGoalFn(inputObj)
    
  }

  renderPlaceholder = () => {
    console.log('displaying message');
    return (
        <div className="userPrompt">
          <p>Hello {this.state.nameInput}</p>
          <p>You've set a goal to read {this.state.goalInput} books this year.  Start by searching for a book by title or author at the top right corner.</p>
        </div>
    )
  }

  renderform = () => {
    return (
        <form action="" onSubmit={this.onFormSubmit}>
          <div className="nameInput">
            <label htmlFor="nameInput">What's your name?</label>
            <input name="nameInput"
              type="text"
              id="nameInput"
              placeholder="Enter your name"
              value={this.state.nameInput}
              onChange={(e) => { this.inputField(e, "nameInput") }}
            />
          </div>
          <div className="goalInput">
            <label htmlFor="goalInput">What's your reading goal for the year? (max 100)</label>
            <input name="goalInput"
              type="text"
              id="goalInput"
              placeholder="10"
              pattern="^[1-9][0-9]?$|^100$"
              value={this.state.goalInput}
              onChange={(e) => { this.inputField(e, "goalInput") }}
            />
          </div>
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

  inputField = (e,userInput) => {
    const input = {}
    input[userInput] = e.target.value

    this.setState(input)
    console.log(input)
  }


  render() {
    return(
      <section className="tracker">
        <div className="formOverlay">
        {
          this.state.goalSubmit
            ? this.renderform()
            : this.renderPlaceholder()
        }
        </div>
      </section>
    )
  }
}

export default Tracker;