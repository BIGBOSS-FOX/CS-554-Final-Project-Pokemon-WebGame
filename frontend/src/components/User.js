import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import History from './History'
import Leaderboard from './Leaderboard'
import { connect } from 'react-redux'
import { logOut, fetchUserInfo} from '../store/actions/authAction'
import { fetchAllUsers } from '../store/actions/fetchAction'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import SplitPane, {Pane} from 'react-split-pane'
// import Split from 'react-split';
// import 'react-photoswipe/lib/photoswipe.css';
// import {PhotoSwipe} from 'react-photoswipe';

// let isOpen = true;
 
// let items = [
//   {
//     src: 'http://lorempixel.com/1200/900/sports/1',
//     w: 1200,
//     h: 900,
//     title: 'Image 1'
//   },
//   {
//     src: 'http://lorempixel.com/1200/900/sports/2',
//     w: 1200,
//     h: 900,
//     title: 'Image 2'
//   }
// ];
 
// let options = {
//   //http://photoswipe.com/documentation/options.html
// };

class User extends Component {
    // state = {
    //     isOpen: true,
    //     items: [
    //         {
    //           src: 'http://lorempixel.com/1200/900/sports/1',
    //           w: 1200,
    //           h: 900,
    //           title: 'Image 1'
    //         },
    //         {
    //           src: 'http://lorempixel.com/1200/900/sports/2',
    //           w: 1200,
    //           h: 900,
    //           title: 'Image 2'
    //         }
    //     ],
    //     options: {
    //         //http://photoswipe.com/documentation/options.html
    //     }
    // }

 
     
    // handleClose = () => {
    //     this.setState({
    //         isOpen: false
    //     })
    // };





    componentDidMount() {
        console.log('User.js componentDidMount() props before fetchUserInfo')
        console.log(this.props)
        this.props.fetchUserInfo(this.props.auth_firebase.email);
        this.props.fetchAllUsers();
        // this.setState({
        //     email: this.props.auth_firebase.email
        // })
    }

    handleClick = async () => {
        await axios.put(`http://localhost:5000/users/monster/user/clearmonster/${this.props.auth_mongodb.userInfo._id}`)
        let userId = this.props.auth_mongodb.userInfo._id;
        console.log('@@@@@@   ' + userId);
        this.props.history.push({ pathname: `/pokemon`, state: { userId: userId } });
    }
    
    render() {
        const { auth_firebase, auth_mongodb } = this.props;
        console.log("User.js render() props")
        console.log(this.props)

        if (!auth_firebase.uid) return <Redirect to= {'/'} />
        console.log("User.js render() auth_firebase.uid")
        console.log(auth_firebase.uid)
        return (
            <div className="container">
                {/* <PhotoSwipe isOpen={this.state.isOpen} items={this.state.items} options={this.state.options} onClose={this.handleClose}/> */}
                <h1 className="center cyan-text text-darken-3">Welcome {auth_mongodb.userInfo.userName}</h1>
                <div className="col s12 m6 center">
                        {/* <Link to={'/'}> */}
                            <button className="btn pink darken-1 z-depth-1" onClick={this.props.logOut}>Logout</button>
                        {/* </Link> */}
                </div>
                <div className='row center newgame'>
                    {/* <div className="col s12 m6 center"> */}
                        {/* <Link to={'/pokemon'}> */}
                            <button className="waves-effect waves-light btn-large cyan darken-3 pulse" onClick={this.handleClick}>New Game</button>
                        {/* </Link> */}
                    {/* </div> */}
                    {/* <div className="col s12 m6 center">
                        <Link to={'/game'}>
                            <button className="waves-effect waves-light btn-large">Resume Game</button>
                        </Link>
                    </div> */}
                </div>
                {/* <div className='row'>
                    <div className="col s12 m6 center">
                        <History bestScore={this.props.auth_mongodb.userInfo.bestScore}/>
                    </div>
                    <div className="col s12 m6 center">
                        <Leaderboard userList={this.props.fetch_mongodb.userList}/>
                    </div>
                </div> */}
            
                {/* <div className="content">
                    <Split
                        gutterSize={20}
                        sizes= {[25,25,50]}
                        minSize={[300,300,300]}
                        >
                        <div className="cell a">A</div>
                        <div className="cell b">B</div>
                        <div className="cell c">C</div>
                    </Split>

                </div> */}



                {/* <Split
                    sizes={[50, 50]}
                    direction='horizontal'
                    minSize={100}
                >
                    <History bestScore={this.props.auth_mongodb.userInfo.bestScore}/>
                    <Leaderboard userList={this.props.fetch_mongodb.userList}/>
                </Split> */}

                <SplitPane split="vertical" minSize={400} maxSize = {1200} defaultSize={800}>
                    {/* <div><History bestScore={this.props.auth_mongodb.userInfo.bestScore}/></div>
                    <div><Leaderboard userList={this.props.fetch_mongodb.userList}/></div> */}
                    <Pane initialSize="50%" minSize="10%" maxSize="500px">  
                        {/* <div className="col s12 m6 center"> */}
                        <History bestScore={this.props.auth_mongodb.userInfo.bestScore}/>
                        {/* </div> */}
                    </Pane>
                    <Pane initialSize="50%" minSize="10%" maxSize="500px">    
                        {/* <div className="col s12 m6 center"> */}
                        <Leaderboard userList={this.props.fetch_mongodb.userList}/>
                        {/* </div> */}
                    </Pane>
                </SplitPane>


            </div>
            

        )
    }
}

const mapStateToProps = (state) => {
    console.log('User.js mapStateToProps state')
    console.log(state);

    return {
        auth_firebase: state.firebase.auth,
        auth_mongodb: state.auth,
        fetch_mongodb: state.fetch
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('User.js mapDispatchToProps dispatching actions')
    return {
        logOut: () => dispatch(logOut()),
        fetchUserInfo: (email) => dispatch(fetchUserInfo(email)),
        fetchAllUsers: () => dispatch(fetchAllUsers())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User)
