import React, { Component } from 'react';
import firebase from 'firebase';

class GoalPercent extends Component {
    constructor(){
        super();
        this.state = ({
            read: [],
            readCounter: 0,
        })
    }

    renderReadingList() {
        const countRead = this.state.read.map(
            (response, i) => {
                return (
                    <div>
                        {response.Read === true ? this.setState({readCounter: this.state.readCounter + 1  }) : null}
                    </div>
                )
            })
            return (<div>{countRead}</div>)
        }

    componentDidMount() {
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
            console.log(this.state.read);

        });
    }
    
    render(){
        console.log("Read Counter", this.state.readCounter);
        return(
            <div>
                
            </div>
        )
    }
}
export default GoalPercent;