import React, { Component } from 'react';
import firebase from 'firebase';

class GoalPercent extends Component {
    constructor(){
        super();
        this.state = ({
            // read: [],
            readCounter: 0,
            percent: 0
        })
    }

    // //Filter all books with read: true to a new array
    // filterRead = () => {
    //     const copyOfRead = [...this.state.read];
    //     const countRead = copyOfRead.filter((read, i) => {
    //           return  read.Read === true;
    //     })
    //     console.log("count read length", countRead.length);
    //     const totalRead = countRead.length
    //     this.setState({
    //         readCounter: totalRead
    //     })
    //     this.calcPercent();
    // }

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