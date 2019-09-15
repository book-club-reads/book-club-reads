import React, { Component } from 'react';
import firebase from 'firebase';

class GoalPercent extends Component {
    constructor(){
        super();
        this.state = ({
            read: [],
            readCounter: 0,
            percent: 0
        })
    }

    filterRead = () => {
        const copyOfRead = [...this.state.read];
        const countRead = copyOfRead.filter((read, i) => {
              return  read.Read === true;
        })
        console.log("count read length", countRead.length);
        const totalRead = countRead.length
        this.setState({
            readCounter: totalRead
        })
        this.calcPercent();
    }

    

    calcPercent = () => {
        const percentage = ((this.state.readCounter / this.props.goalInput) * 100 )
        console.log("percentage" ,percentage);
        this.setState({
            percent: percentage
        })
    }
    firebaseData = () => {
        const dbRef = firebase.database().ref("Name");
        dbRef.on("value", data => {
            const response = data.val();
            const newState = [];

            for (let key in response) {
                    newState.push({
                        Read: response[key].Read
                    });
            }
            this.setState({
                read: newState
            });
            this.filterRead()
        });
    }
    componentDidMount(){
        this.firebaseData();
    }
    // componentDidUpdate(prevProps){
    //     if(this.state.readCounter && this.state.readCounter !== prevProps.readCounter){
    //         this.filterRead()
    //     }
    // }

    
    render(){
        console.log("Read Counter", this.props.goalInput);
        console.log("percent", this.state.percent);
        console.log("Count Read", this.state.readCounter);
        return(
            <div>
                <p>Goal Completion: {this.state.percent}%</p>
            </div>
        )
    }
}
export default GoalPercent;