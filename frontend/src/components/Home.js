import React, { Component } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import Leaderboard from './Leaderboard'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAllUsers } from '../store/actions/fetchAction'
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipe} from 'react-photoswipe';
// import Split from 'react-split';
import Bulbasaur from '../images/Bulbasaur2.png';
import Charmander from '../images/Charmander2.png';
import Electabuzz from '../images/Electabuzz2.png';
import Growlithe from '../images/Growlithe2.png';
import Meowth from '../images/Meowth2.png';
import Oddish from '../images/Oddish2.png';
import Pikachu from '../images/Pikachu2.png';
import Psyduck from '../images/Psyduck2.png';
import Rattata from '../images/Rattata2.png';
import Squirtle from '../images/Squirtle2.png';

class Home extends Component {
    state = {
        isOpen: false,
        items: [
            {
              src:Bulbasaur,
              w: 1200,
              h: 900,
              title: 'Bulbasaur'
            },
            {
              src: Charmander,
              w: 1200,
              h: 900,
              title: 'Charmander'
            },
            {
                src: Electabuzz,
                w: 1200,
                h: 900,
                title: 'Electabuzz'
              },
              {
                src: Growlithe,
                w: 1200,
                h: 900,
                title: 'Charmander'
              },
              {
                src: Meowth,
                w: 1200,
                h: 900,
                title: 'Meowth'
              },
              {
                src: Oddish,
                w: 1200,
                h: 900,
                title: 'Oddish'
              },
              {
                src: Pikachu,
                w: 1200,
                h: 900,
                title: 'Pikachu'
              },
              {
                src: Charmander,
                w: 1200,
                h: 900,
                title: 'Charmander'
              },
              {
                src: Psyduck,
                w: 1200,
                h: 900,
                title: 'Psyduck'
              },
              {
                src: Rattata,
                w: 1200,
                h: 900,
                title: 'Rattata'
              },
              {
                src: Squirtle,
                w: 1200,
                h: 900,
                title: 'Squirtle'
              }
        ],
        options: {
            //http://photoswipe.com/documentation/options.html
        }
    }

    handleOpen = () => {
        this.setState({
            isOpen: true
        })
    };

    handleClose = () => {
        this.setState({
            isOpen: false
        })
    };

    componentDidMount() {
        // console.log('User.js componentDidMount() props before fetchUserInfo')
        // console.log(this.props)
        // this.props.fetchUserInfo(this.props.auth_firebase.email);
        this.props.fetchAllUsers();
        // this.setState({
        //     email: this.props.auth_firebase.email
        // })
    }
    render() {
        const { auth } = this.props;
        console.log(this.props)
        if (!auth.isLoaded) return <p></p>
        if (auth.uid) return <Redirect to= {'/user/' + auth.uid} />
        return (
            <div className="container">
                <PhotoSwipe isOpen={this.state.isOpen} items={this.state.items} options={this.state.options} onClose={this.handleClose}/>
                <div className="title home">
                    <h1 className="center cyan-text text-darken-3 brand-logo">Welcome To Pokemon Master</h1>
                    {/* <Link to={'/test'}>
                        <p className="center">To Test Page</p>
                    </Link> */}
                </div>

                <div className='row home'>
                    <div className="col s12 m4 l4 center">
                        <Link to={'/login'}>
                            <button className="waves-effect waves-light btn-large">Login</button>
                        </Link>
                    </div>
                    <div className="col s12 m4 l4 center">
                        {/* <Link to={'/login'}> */}
                            <button className=" light-blue darken-2 waves-effect waves-light btn-large" onClick={this.handleOpen}>Gallery</button>
                        {/* </Link> */}
                    </div>
                    <div className="col s12 m4 l4 center">
                        <Link to={'/signup'}>
                            <button className="waves-effect waves-light btn-large">Signup</button>
                        </Link>
                    </div>
                </div>
                <div className="leaderboard home">
                    <Leaderboard userList={this.props.fetch_mongodb.userList}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth: state.firebase.auth,
        fetch_mongodb: state.fetch
    }
}

const mapDispatchToProps = (dispatch) => {
    // console.log('User.js mapDispatchToProps dispatching actions')
    return {
        // logOut: () => dispatch(logOut()),
        // fetchUserInfo: (email) => dispatch(fetchUserInfo(email)),
        fetchAllUsers: () => dispatch(fetchAllUsers())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);