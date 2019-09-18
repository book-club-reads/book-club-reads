import React, {Component} from 'react';
import books from '../styles/assets/bookLogo.png';
import { Link } from 'react-router-dom';


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
    return (
        <div className="userPrompt">
          <p>Hello {this.state.nameInput}</p>
          <p>You've set a goal to read {this.state.goalInput} books this year.  Start by searching for a book by title or author at the top right corner.</p>
          <Link to="/search">
          <button>Get Started</button>
          </Link>
        </div>
    )
  }

  renderform = () => {
    return (
        <form action="" onSubmit={this.onFormSubmit}>
          <div className="nameInput">
            <label htmlFor="nameInput">What's your name?</label>
            <input name="nameInput"
              required
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
              required
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
  }

  render() {
    return (
      <div>
        <header>
          <div className="title">
            <div className="logo">
              <img src={books} alt="Logo with books" />
            </div>
            <h1>Book Club Reads</h1>
          </div>
        </header>
        <section className="content">
          <div className="formOverlay">
            {this.state.goalSubmit ? this.renderform() : this.renderPlaceholder()}
          </div>
        </section>
      </div>
    );
  }
}

export default Tracker;