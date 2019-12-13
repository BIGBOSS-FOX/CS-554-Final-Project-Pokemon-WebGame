import React, {Component} from 'react'
export class ScoreBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {};
    render() {
        return(
            <p>Current Score:  {this.props.currentScore}</p>
        )
    }
}