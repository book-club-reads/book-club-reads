import React, {Component} from 'react';
//component is used to let user input their reading goal
//also acts as landing page

class Tracker extends Component {
  constructor(){
    super();
    this.state ={

    }
  }

  onFormSubmit = (e) => {
    
  
  }


  render() {
    return (
      <form action="" onSubmit={this.onFormSubmit}>
        <label 
          htmlFor="goal" 
          className="">How many books do you want to read this year?</label>
        <input 
          type="text" 
          name="" 
          id="goal" 
          className=""
          placeholder="10" />
        <button className="" type="submit">Set Goal</button>
      </form>
    )
  }
}

export default Tracker;