import React, { Component, Link } from 'react';

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
//Hook to Redux
// import { connect } from 'react-redux';
// import { fetchUserClearMonster } from '../store/actions/authAction';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { async } from '@firebase/util';

export class Pokemon extends Component {
    constructor(props) {
        super(props);

        // 记住写的时候先把用户的宝可梦列表清空

        this.state = {
            user: null,
            userId: null,
            showme1:true,
            showme2:true,
            showme3:true,
            showme4:true,
            showme5:true,
            showme6:true,
            showme7:true,
            showme8:true,
            showme9:true,
            showme10:true,
            Yourpokemons: []
        };
    }

    operation1(){
        this.setState({
            showme1:false,  
        })
    }

    operation2(){
        this.setState({
            showme2:false,  
        })
    }

    operation3(){
        this.setState({
            showme3:false,  
        })
    }

    operation4(){
        this.setState({
            showme4:false,  
        })
    }

    operation5(){
        this.setState({
            showme5:false,  
        })
    }

    operation6(){
        this.setState({
            showme6:false,  
        })
    }

    operation7(){
        this.setState({
            showme7:false,  
        })
    }

    operation8(){
        this.setState({
            showme8:false,  
        })
    }

    operation9(){
        this.setState({
            showme9:false,  
        })
    }

    operation10(){
        this.setState({
            showme10:false,  
        })
    }

    // 测试
    componentDidMount() {
        axios.put(`http://localhost:5000/users/monster/user/clearmonster/${this.props.location.state.userId}`)
    }

    //     let userinfo = this.props.auth_mongodb.userInfo;
    //     console.log('Pokemon.js componentDidMount() this.props.auth_mongodb.userInfo.monster, before setState');
    //     console.log(this.props.auth_mongodb.userInfo.monster);
    //     this.setState({ user: userinfo });

    //     //Move from update to mount
    //     console.log(
    //         'Pokemon.js componentDidMount() props this.props.auth_mongodb.userInfo.monster, before fetchUserInfo'
    //     );
    //     console.log(this.props);
    //     console.log(this.props.auth_mongodb.userInfo.monster);
    //     if (this.props.auth_firebase.isLoaded) {
    //         console.log('Pokemon.js componentDidMount() auth_firebase isLoaded == True');
    //         this.props.fetchUserInfo(this.props.auth_firebase.email);
    //     } else console.log('Pokemon.js componentDidMount() auth_firebase isLoaded == False');
    // }

    // componentDidUpdate() {
    //     console.log('Pokemon.js componentDidUpdate() props before fetchUserInfo')
    //     console.log(this.props)
    //     console.log(this.props.auth_mongodb.userInfo.monster)
    //     if (this.props.auth_firebase.isLoaded) {
    //         console.log('Pokemon.js componentDidUpdate() auth_firebase isLoaded == True')
    //         this.props.fetchUserInfo(this.props.auth_firebase.email);
    //     }
    //     else
    //         console.log('Pokemon.js componentDidUpdate() auth_firebase isLoaded == False')

    // }

    onRemoveItem = (id) => {
        this.setState((state) => {
            const monster = state.user.monster.filter((item) => item.id !== id);
            return {
                monster
            };
        });
    };

    onClick() {
        let userId = this.props.location.state.userId;
        console.log('@@@@@@   ' + userId);
        this.props.history.push({ pathname: `/game`, state: { userId: userId } });
        // window.location.href="/game";
    }

    handleChange() {
        console.log(this.state.user.monster);
        this.setState({
            user: {
                ...this.state.user,
                monster: []
            }
        });
    }

    render() {
        const { Yourpokemons } = this.state.Yourpokemons;
        if(this.props.location.state == undefined) {window.location.href="/" }
        // //route guard
        // const { auth_firebase, auth_mongodb } = this.props;
        // console.log('Pokemon.js render() props');
        // console.log(this.props);

        // if (!auth_firebase.isLoaded) {
        //     console.log('Pokemon.js render() redirect to /pokemon')
        //     return <Redirect to= {'/pokemon'} />
        // }

        // if (auth_firebase.isLoaded && !auth_firebase.uid) {
        //     console.log('Pokemon.js render() redirect to /');
        //     return <Redirect to={'/'} />;
        // }
        // console.log('Pokemon.js render() auth_firebase.uid');
        // console.log(auth_firebase.uid);

        // if (this.props.auth_mongodb.userInfo._id === '' && this.props.auth_firebase.isLoaded) {
        //     console.log('Pokemon.js render() auth_firebase isLoaded == True no _id');
        //     this.props.fetchUserClearMonster(this.props.auth_firebase.email);
        // }



        // if (this.props.auth_mongodb.userInfo._id !== '' && this.props.auth_firebase.isLoaded) {
        //     console.log('Pokemon.js render() auth_firebase isLoaded == True has _id');
        //     this.props.clearPokemonFromUser(this.props.auth_mongodb.userInfo._id);
        // }

        return (
            <div className="container teal lighten-4">
                {this.handleChange}{' '}
                <div className="row">
                    <nav className="col s12 m2 l2 teal lighten-4">
                            <button
                                className=" waves-effect waves-light btn-small pulse"
                                onClick={async() => {
                                const  user = await axios.get(`http://localhost:5000/users/${this.props.location.state.userId}`)
                                console.log("user object from mongodb");
                                console.log(user)
                                console.log(user.data.monster.length)
                                    if (user.data.monster.length === 5) {
                                        {
                                            this.onClick();
                                        }
                                    } else {
                                        {
                                            window.alert('You have to choose five pokemon');
                                        }
                                    }
                                }}
                            >
                                START{' '}
                            </button>{' '}
                            <button  className=" waves-effect waves-light btn-small"  
                            onClick={async()=>{
                                await axios.put(`http://localhost:5000/users/monster/user/clearmonster/${this.props.location.state.userId}`)
                                this.setState((state) => ({
                                    showme1:true,
                                    showme2:true,
                                    showme3:true,
                                    showme4:true,
                                    showme5:true,
                                    showme6:true,
                                    showme7:true,
                                    showme8:true,
                                    showme9:true,
                                    showme10:true,
                                    Yourpokemons: []
                                    
                                }));
                            }}>CLEAR</button>
                            <ul>
                                {' '}
                                {
                                // async () => {const  user = await axios.get(`http://localhost:5000/users/${this.props.auth_mongodb.userInfo._id}`)
                               this.state.Yourpokemons.map((item) => (
                                    <li className="col 12" key={item.id}>
                                        <h5 className="red-text"> {item.name} </h5>{' '}
                                    </li>
                                ))}{' '}
                            </ul>{' '}
                            {/* <button  className="waves-effect waves-light btn-small"  
                            onClick={async()=>{
                                await axios.put(`http://localhost:5000/users/monster/user/clearmonster/${this.props.location.state.userId}`)
                                this.setState((state) => ({
                                    Yourpokemons: []
                                }));
                            }}>CLEAR</button> */}
                    </nav>{' '}
                    <div className="col s12 m10 l10">
                        <div className="row">
                            { this.state.showme1?
                            <div className="col s12 m6 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={Bulbasaur} alt="Bulbasaur" />
                                    </div>{' '}
                                    <div className="card-content">
                                        <h4>
                                            <span className="green-text text-darken-3"> Bulbasaur </span>{' '}
                                        </h4>{' '}
                                        <p> ATK 25 SP 20 </p> <p> HP 100 Type: Grass </p>{' '}
                                    </div>{' '}
                                    <div className="card-action">
                                        <button
                                            className="waves-effect waves-light btn-large"
                                            onClick={async () => {
                                                const  user = await axios.get(`http://localhost:5000/users/${this.props.location.state.userId}`)
                                                // console.log('someeeeeeeeeeeeeeeeeeeeeeeeeee');
                                                // console.log(this.props.auth_mongodb.userInfo);
                                                if ( user.data.monster.some((item) => "Bulbasaur" === item.monsterName) == true) 
                                                {
                                                    {
                                                        
                                                        window.alert(
                                                            "You can't add this pokemon, you had choosed this one"
                                                        );
                                                    }
                                                } else {
                                                    // await axios.put(
                                                    //     `http://localhost:5000/users/${this.props.auth_mongodb.userInfo
                                                    //         ._id}/add/Bulbasaur`
                                                    // );
                                                    if (user.data.monster.length < 5) {
                                                        this.setState((state) => ({
                                                            Yourpokemons: [
                                                                ...state.Yourpokemons,
                                                                { id: 1, name: 'Bulbasaur' }
                                                            ]
                                                        }));
                                                await axios.put(`http://localhost:5000/users/${this.props.location.state.userId}/add/Bulbasaur` );
                                                {this.operation1()}
                                                // const  user2 = await axios.get(`http://localhost:5000/users/${this.props.auth_mongodb.userInfo._id}`)
                                                // console.log(user2.data.monster)
                                                    } else {
                                                        {
                                                            window.alert("You can't choose more than 5 pokemons");
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            Add{' '}
                                        </button>{' '}
                                    </div>{' '}
                                </div>{' '}
                            </div>
                            :null
                            }

                            { this.state.showme2?
                            <div className="col s12 m6 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={Charmander} alt="Charmander" />
                                    </div>{' '}
                                    <div className="card-content">
                                        <h4>
                                            <span className="red-text text-darken-2"> Charmander </span>{' '}
                                        </h4>{' '}
                                        <p> ATK 25 SP 20 </p> 
                                        <p> HP 100 Type: Fire </p>{' '}
                                    </div>{' '}
                                    <div className="card-action">
                                        <button
                                            className="waves-effect waves-light btn-large"
                                            onClick={async () => {
                                                const  user = await axios.get(`http://localhost:5000/users/${this.props.location.state.userId}`)
                                                if (user.data.monster.some((item) => "Charmander" === item.monsterName) == true) {
                                                    {
                                                        window.alert(
                                                            "You can't add this pokemon, you had choosed this one"
                                                        );
                                                    }
                                                } else {
                                                    // await axios.put(
                                                    //     `http://localhost:5000/users/${this.props.auth_mongodb.userInfo
                                                    //         ._id}/add/Charmander`
                                                    // );
                                                    if (user.data.monster.length < 5) {
                                                        this.setState((state) => ({
                                                            Yourpokemons: [
                                                                ...state.Yourpokemons,
                                                                { id: 2, name: 'Charmander' }
                                                            ]
                                                        }));
                                                        await axios.put(
                                                            `http://localhost:5000/users/${this.props.location.state.userId}/add/Charmander`)
                                                            {this.operation2()}
                                                    // const  user2 = await axios.get(`http://localhost:5000/users/${this.props.location.state.userId}`)
                                                    // console.log(user2.data.monster)
                                                    } else {
                                                        {
                                                            window.alert("You can't choose more than 5 pokemons");
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            Add{' '}
                                        </button>{' '}
                                    </div>{' '}
                                </div>{' '}
                            </div>
                            :null
                            }

                           { this.state.showme3?
                            <div className="col s12 m6 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={Electabuzz} alt="Electabuzz" />
                                    </div>{' '}
                                    <div className="card-content">
                                        <h4>
                                            <span className="lime-text text-darken-2"> Electabuzz </span>{' '}
                                        </h4>{' '}
                                        <p> ATK 25 SP 20 </p> <p> HP 100 Type: Electric </p>{' '}
                                    </div>{' '}
                                    <div className="card-action">
                                        <button
                                            className="waves-effect waves-light btn-large"
                                            onClick={async () => {
                                                const  user = await axios.get(`http://localhost:5000/users/${this.props.location.state.userId}`)
                                                if (user.data.monster.some((item) => "Electabuzz" === item.monsterName) == true) {
                                                    {
                                                        window.alert(
                                                            "You can't add this pokemon, you had choosed this one"
                                                        );
                                                    }
                                                } else {
                                                    // await axios.put(
                                                    //     `http://localhost:5000/users/${this.props.auth_mongodb.userInfo
                                                    //         ._id}/add/Electabuzz`
                                                    // );
                                                    if (user.data.monster.length < 5) {
                                                        this.setState((state) => ({
                                                            Yourpokemons: [
                                                                ...state.Yourpokemons,
                                                                { id: 3, name: 'Electabuzz' }
                                                            ]
                                                        }));
                                                        await axios.put(
                                                            `http://localhost:5000/users/${this.props.location.state.userId}/add/Electabuzz`
                                                        );
                                                        {this.operation3()}
                                                    //     const  user2 = await axios.get(`http://localhost:5000/users/${this.props.location.state.userId}`)
                                                    // console.log(user2.data.monster)
                                                    } else {
                                                        {
                                                            window.alert("You can't choose more than 5 pokemons");
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            Add{' '}
                                        </button>
                                    </div>{' '}
                                </div>{' '}
                            </div>
                            :null
                        }
    
                            { this.state.showme4?
                            <div className="col s12 m6 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={Growlithe} alt="Growlithe" />
                                    </div>{' '}
                                    <div className="card-content">
                                        <h4>
                                            <span className="red-text text-darken-2"> Growlithe </span>{' '}
                                        </h4>{' '}
                                        <p> ATK 25 SP 20 </p> <p> HP 100 Type: Fire </p>{' '}
                                    </div>{' '}
                                    <div className="card-action">
                                        <button
                                            className="waves-effect waves-light btn-large"
                                            onClick={async () => {
                                                const  user = await axios.get(`http://localhost:5000/users/${this.props.location.state.userId}`)
                                                if (user.data.monster.some((item) => "Growlithe" === item.monsterName) == true) {
                                                    {
                                                        window.alert(
                                                            "You can't add this pokemon, you had choosed this one"
                                                        );
                                                    }
                                                } else {
                                                    // // await axios.put(
                                                    // //     `http://localhost:5000/users/${this.props.auth_mongodb.userInfo
                                                    // //         ._id}/add/Growlithe`
                                                    // );
                                                    if (user.data.monster.length < 5) {
                                                        this.setState((state) => ({
                                                            Yourpokemons: [
                                                                ...state.Yourpokemons,
                                                                { id: 4, name: 'Growlithe' }
                                                            ]
                                                        }));
                                                        await axios.put(
                                                            `http://localhost:5000/users/${this.props.location.state.userId}/add/Growlithe`)
                                                            {this.operation4()}
                                                                // const  user2 = await axios.get(`http://localhost:5000/users/${this.props.auth_mongodb.userInfo._id}`)
                                                                // console.log(user2.data.monster)
                                                    } else {
                                                        {
                                                            window.alert("You can't choose more than 5 pokemons");
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            Add{' '}
                                        </button>
                                    </div>{' '}
                                </div>{' '}
                            </div>
                             :null
                            }
                            
                            { this.state.showme5?
                            <div className="col s12 m6 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={Meowth} alt="Meowth" />
                                    </div>{' '}
                                    <div className="card-content">
                                        <h4>
                                            <span className="grey-text text-grey darken-3"> Meowth </span>{' '}
                                        </h4>{' '}
                                        <p> ATK 25 </p> <p> HP 120 Type: Normal </p>{' '}
                                    </div>{' '}
                                    <div className="card-action">
                                        <button
                                            className="waves-effect waves-light btn-large"
                                            onClick={async () => {
                                                const  user = await axios.get(`http://localhost:5000/users/${this.props.location.state.userId}`)
                                                if (user.data.monster.some((item) => "Meowth" === item.monsterName) == true) {
                                                    {
                                                        window.alert(
                                                            "You can't add this pokemon, you had choosed this one"
                                                        );
                                                    }
                                                } else {
                                                    // await axios.put(
                                                    //     `http://localhost:5000/users/${this.props.auth_mongodb.userInfo
                                                    //         ._id}/add/Meowth`
                                                    // );
                                                    if (user.data.monster.length < 5) {
                                                        this.setState((state) => ({
                                                            Yourpokemons: [
                                                                ...state.Yourpokemons,
                                                                { id: 5, name: 'Meowth' }
                                                            ]
                                                        }));
                                                        await axios.put(
                                                            `http://localhost:5000/users/${this.props.location.state.userId}/add/Meowth`
                                                        );
                                                        {this.operation5()}
                                                    } else {
                                                        {
                                                            window.alert("You can't choose more than 5 pokemons");
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            Add{' '}
                                        </button>
                                    </div>{' '}
                                </div>{' '}
                            </div>
                            :null
                        }
                            
                            { this.state.showme6?
                            <div className="col s12 m6 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={Oddish} alt="Oddish" />
                                    </div>{' '}
                                    <div className="card-content">
                                        <h4>
                                            <span className="green-text text-darken-3"> Oddish </span>{' '}
                                        </h4>{' '}
                                        <p> ATK 25 SP 20 </p> <p> HP 100 Type: Grass </p>{' '}
                                    </div>{' '}
                                    <div className="card-action">
                                        <button
                                            className="waves-effect waves-light btn-large"
                                            onClick={async () => {
                                                const  user = await axios.get(`http://localhost:5000/users/${this.props.location.state.userId}`)
                                                if (user.data.monster.some((item) => "Oddish" === item.monsterName) == true) {
                                                    {
                                                        window.alert(
                                                            "You can't add this pokemon, you had choosed this one"
                                                        );
                                                    }
                                                } else {
                                                    // await axios.put(
                                                    //     `http://localhost:5000/users/${this.props.auth_mongodb.userInfo
                                                    //         ._id}/add/Oddish`
                                                    // );
                                                    if (user.data.monster.length < 5) {
                                                        // this.setState((state) => ({
                                                        //     Yourpokemons: [
                                                        //         ...state.Yourpokemons,
                                                        //         { id: 6, name: 'Oddish' }
                                                        //     ]
                                                        // }));
                                                        this.setState((state) => ({
                                                            Yourpokemons: [
                                                                ...state.Yourpokemons,
                                                                { id: 6, name: 'Oddish' }
                                                            ]
                                                        }));
                                                        await axios.put(
                                                            `http://localhost:5000/users/${this.props.location.state.userId}/add/Oddish`
                                                        );
                                                        {this.operation6()}
                                                    } else {
                                                        {
                                                            window.alert("You can't choose more than 5 pokemons");
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            Add{' '}
                                        </button>
                                    </div>{' '}
                                </div>{' '}
                            </div>
                              :null
                            }
                            
                            { this.state.showme7?
                            <div className="col s12 m6 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={Pikachu} alt="Pikachu" />
                                    </div>{' '}
                                    <div className="card-content">
                                        <h4>
                                            <span className="lime-text text-darken-2"> Pikachu </span>{' '}
                                        </h4>{' '}
                                        <p> ATK 25 SP 20 </p> <p> HP 100 Type: Electric </p>{' '}
                                    </div>{' '}
                                    <div className="card-action">
                                        <button
                                            className="waves-effect waves-light btn-large"
                                            onClick={async () => {
                                                const  user = await axios.get(`http://localhost:5000/users/${this.props.location.state.userId}`)
                                                if (user.data.monster.some((item) => "Pikachu" === item.monsterName) == true) {
                                                    {
                                                        window.alert(
                                                            "You can't add this pokemon, you had choosed this one"
                                                        );
                                                    }
                                                } else {
                                                    // await axios.put(
                                                    //     `http://localhost:5000/users/${this.props.auth_mongodb.userInfo
                                                    //         ._id}/add/Pikachu`
                                                    // );
                                                    if (user.data.monster.length < 5) {
                                                        this.setState((state) => ({
                                                            Yourpokemons: [
                                                                ...state.Yourpokemons,
                                                                { id: 7, name: 'Pikachu' }
                                                            ]
                                                        }));
                                                        await axios.put(
                                                            `http://localhost:5000/users/${this.props.location.state.userId}/add/Pikachu`
                                                        );
                                                        {this.operation7()}
                                                    } else {
                                                        {
                                                            window.alert("You can't choose more than 5 pokemons");
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            Add{' '}
                                        </button>
                                    </div>{' '}
                                </div>{' '}
                            </div>
                             :null
                            }

                            { this.state.showme8?
                            <div className="col s12 m6 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={Psyduck} alt="Psyduck" />
                                    </div>{' '}
                                    <div className="card-content">
                                        <h4>
                                            <span className="blue-text text-darken-2"> Psyduck </span>{' '}
                                        </h4>{' '}
                                        <p> ATK 25 SP 20 </p> <p> HP 100 Type: Water </p>{' '}
                                    </div>{' '}
                                    <div className="card-action">
                                        <button
                                            className="waves-effect waves-light btn-large"
                                            onClick={async () => {
                                                const  user = await axios.get(`http://localhost:5000/users/${this.props.location.state.userId}`)
                                                if(user.data.monster.some((item) => "Psyduck" === item.monsterName) == true) {
                                                    {
                                                        window.alert(
                                                            "You can't add this pokemon, you had choosed this one"
                                                        );
                                                    }
                                                } else {
                                                    // await axios.put(
                                                    //     `http://localhost:5000/users/${this.props.auth_mongodb.userInfo
                                                    //         ._id}/add/Psyduck`
                                                    // );
                                                    if (user.data.monster.length < 5) {
                                                        this.setState((state) => ({
                                                            Yourpokemons: [
                                                                ...state.Yourpokemons,
                                                                { id: 8, name: 'Psyduck' }
                                                            ]
                                                        }));
                                                        await axios.put(
                                                            `http://localhost:5000/users/${this.props.location.state.userId}/add/Psyduck`
                                                        );
                                                        {this.operation8()}
                                                    } else {
                                                        {
                                                            window.alert("You can't choose more than 5 pokemons");
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            Add{' '}
                                        </button>
                                    </div>{' '}
                                </div>{' '}
                            </div>
                            :null
                        }
 
                             {this.state.showme9?
                            <div className="col s12 m6 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={Rattata} alt="Growlithe" />
                                    </div>{' '}
                                    <div className="card-content">
                                        <h4>
                                            <span className="grey-text text-grey darken-3"> Rattata </span>{' '}
                                        </h4>{' '}
                                        <p> ATK 25 </p> <p> HP 120 Type: Normal </p>{' '}
                                    </div>{' '}
                                    <div className="card-action">
                                        <button
                                            className="waves-effect waves-light btn-large"
                                            onClick={async () => {
                                                const  user = await axios.get(`http://localhost:5000/users/${this.props.location.state.userId}`)
                                                if(user.data.monster.some((item) => "Rattata" === item.monsterName)==true) {
                                                    {
                                                        window.alert(
                                                            "You can't add this pokemon, you had choosed this one"
                                                        );
                                                    }
                                                } else {
                                                    // await axios.put(
                                                    //     `http://localhost:5000/users/${this.props.auth_mongodb.userInfo
                                                    //         ._id}/add/Rattata`
                                                    // );
                                                    if (user.data.monster.length < 5) {
                                                        this.setState((state) => ({
                                                            Yourpokemons: [
                                                                ...state.Yourpokemons,
                                                                { id: 9, name: 'Rattata' }
                                                            ]
                                                        }));
                                                        await axios.put(
                                                            `http://localhost:5000/users/${this.props.location.state.userId}/add/Rattata`
                                                        );
                                                        {this.operation9()}
                                                    } else {
                                                        {
                                                            window.alert("You can't choose more than 5 pokemons");
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            Add{' '}
                                        </button>
                                    </div>{' '}
                                </div>{' '}
                            </div>
                            :null
                        }
                            
                            {this.state.showme10?
                            <div className="col s12 m6 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={Squirtle} alt="Squirtle" />
                                    </div>{' '}
                                    <div className="card-content">
                                        <h4>
                                            <span className="blue-text text-darken-2"> Squirtle </span>{' '}
                                        </h4>{' '}
                                        <p> ATK 25 SP 20 </p> <p> HP 100 Type: Water </p>{' '}
                                    </div>{' '}
                                    <div className="card-action">
                                        <button
                                            className="waves-effect waves-light btn-large"
                                            onClick={async () => {
                                                const  user = await axios.get(`http://localhost:5000/users/${this.props.location.state.userId}`)
                                                if (user.data.monster.some((item) => "Squirtle" === item.monsterName)==true) {
                                                    {
                                                        window.alert(
                                                            "You can't add this pokemon, you had choosed this one"
                                                        );
                                                    }
                                                } else {
                                                    // await axios.put(
                                                    //     `http://localhost:5000/users/${this.props.auth_mongodb.userInfo
                                                    //         ._id}/add/Squirtle`
                                                    // );
                                                    if (user.data.monster.length < 5) {
                                                        this.setState((state) => ({
                                                            Yourpokemons: [
                                                                ...state.Yourpokemons,
                                                                { id: 10, name: 'Squirtle' }
                                                            ]
                                                        }));
                                                        await axios.put(
                                                            `http://localhost:5000/users/${this.props.location.state.userId}/add/Squirtle`
                                                        );
                                                        {this.operation10()}
                                                    } else {
                                                        {
                                                            window.alert("You can't choose more than 5 pokemons");
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            Add{' '}
                                        </button>
                                    </div>{' '}
                                </div>{' '}
                            </div>
                              :null
                            }
                        </div>{' '}
                    </div>{' '}
                </div>{' '}
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     console.log('Pokemon.js mapStateToProps state');
//     console.log(state);

//     return {
//         auth_firebase: state.firebase.auth,
//         auth_mongodb: state.auth
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     console.log('Pokemon.js mapDispatchToProps dispatching actions');
//     return {
//         // logOut: () => dispatch(logOut()),
//         fetchUserClearMonster: (email) => dispatch(fetchUserClearMonster(email)),
//         // clearPokemonFromUser: (user_id) => dispatch(clearPokemonFromUser(user_id))
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);
export default Pokemon