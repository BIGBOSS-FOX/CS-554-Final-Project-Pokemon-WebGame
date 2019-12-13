import React, {Component} from 'react'

class FightRecord extends Component {
    constructor(props){
        super(props);
        this.state = {
            messageArr:this.props.battleMessage,
        }
    }
    showBattleMessage =() =>{
        let message = this.state.messageArr;
        // console.log(message[0],'*****',message[1]);
        return message.map((msg,i) =>{
            // console.log(message[i][0],'*****',message[i][1]);
            return(
            <li>Game Round{msg[0]}:    {msg[1]}.....</li>)
        }
        )
    };
    render(){
        return (
            <div className="card-panel teal lighten-2">
                {this.showBattleMessage()}
            </div>
        );
    };
}

export default FightRecord;
