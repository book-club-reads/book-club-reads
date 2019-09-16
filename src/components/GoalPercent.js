import React, { Component } from 'react';

class GoalPercent extends Component {
    constructor(){
        super();
        this.state = ({
            percent: 0
        })
    }
    //Calculates percentage
    calcPercent = () => {
        const percentage = Math.floor((this.props.read / this.props.userGoal.goal) * 100 )
        this.setState({
            percent: percentage
        })
    }

    componentDidUpdate(prevProps){
        if(this.props.read && this.props.read !== prevProps.read){
            this.calcPercent();
        }
    }

    render(){
        return(
            <div>
                <p>Hello {this.props.userGoal.name} <span>Goal Completion: {this.state.percent}%</span></p>
            </div>
        )
    }
}
export default GoalPercent;