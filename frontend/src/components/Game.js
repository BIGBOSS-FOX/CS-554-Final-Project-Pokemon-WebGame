import React, {Component} from 'react'
// import Split from 'react-split'
import FightRecord from './FightRecord';
import img1 from '../images/Bulbasaur.png';
import img2 from '../images/Charmander.png'
import img3 from '../images/Electabuzz.png'
import img4 from '../images/Growlithe.png'
import img5 from '../images/Meowth.png'
import img6 from '../images/Pikachu.png'
import img7 from '../images/Psyduck.png'
import img8 from '../images/Oddish.png'
import img9 from '../images/Squirtle.png'
import img10 from '../images/Rattata.png'
import axios from "axios";
import {ScoreBoard} from "./ScoreBoard";


const images = {
    "Bulbasaur": img1,
    "Charmander": img2,
    "Electabuzz": img3,
    "Growlithe": img4,
    "Meowth": img5,
    "Oddish": img8,
    "Pikachu":img6,
    "Psyduck":img7,
    "Rattata":img10,
    "Squirtle":img9
};

export class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: null,
            monster: null,
            monsterImg: null,
            monsterLeftArr:[],
            monsterType:null,
            currentHP: 0,
            enemyImg:null,
            enemyHP:0,
            enemyType:null,
            currentScore: 0,
            bestScore:0,
            round: 1,
            battleMessage:[[0,"game started"]]
            // 记录敌人monster的血量，打死换怪，同时更新score和bestScore，根据属性掉血。
        }
    }
    componentDidMount() {
        console.log(`mountmountmount`)
        this.getUserInfo();
        this.getEnemyInfo();

    };
    changeMonsterHP = async (attackType) => {
        // console.log("Game1.js enter changeMonsterHP()")
        let prevHP = this.state.currentHP;
        if (prevHP <= 0 && this.state.monsterLeftArr.length === 0) {
            window.alert('Game1 Over, You have got ' + this.state.round + ' scores!');
            if (this.state.currentScore > this.state.bestScore) {
                await axios.put(`http://localhost:5000/users/5df185530cc23223101a8e5d}`,
                    {
                            bestScore: this.state.currentScore
                })
            }
            return;
        }
        if (prevHP <= 0) {
            window.alert("Please, choose another monster!");
            return;
        }
        await this.attack(attackType);/////////*********** update battle message
        let tmp = 0, currentHp=0;

        if(Math.random()>0.5){
            currentHp = prevHP - 10;
            tmp = 10;
        }else {
            currentHp = prevHP - 20;
            tmp = 20;
        }

        // update battle message.
        let messageArr = this.state.battleMessage;
        let normalA='Normal Attack',specialA='Special Attack';
        if(attackType===0) messageArr.push([this.state.round, `Your monster has made ${normalA}, get attacked by enemy，HP： -${tmp}`]);
        if(attackType===1) messageArr.push([this.state.round, `Your monster has made ${specialA}, get attacked by enemy，HP： -${tmp}`]);

        this.setState({
            battleMessage: messageArr
        });
        if (currentHp <= 0) {
            let oldMonsterArr = this.state.monsterLeftArr;
            let newMonsterArr = oldMonsterArr.filter(monster => monster !== this.state.monster);
            this.setState({
                monsterLeftArr: newMonsterArr
            });
            if (this.state.monsterLeftArr.length === 0) {
                window.alert('Game1 Over, You have got ' + this.state.round + ' scores!');
            }
        }

        this.setState({
            currentHP: currentHp,
            round: this.state.round + 1
        });
        await this.updateUserInfo(this.state.monster, currentHp);

    };
    changeMonster = async (monster)=>{
        let i;
        let monsterName = monster;
        const userInfo = await axios.get(`http://localhost:5000/users/5df185530cc23223101a8e5d`);
        let newHP = 100;
        for(i = 0; i<userInfo.data.monster.length; i++){
            if(userInfo.data.monster[i].monsterName === monster){
                newHP = userInfo.data.monster[i].HP;
                break;
            }
        }
        this.setState({
            monster: monster,
            monsterType: userInfo.data.monster[i].Type,
            currentHP: newHP,
            monsterImg: images[monsterName]
        });

    };
    async attack(_attackType){
        console.log("monsterType:!!!!!!!!!"+this.state.monsterType);
        let attackHP = 0;
        if(_attackType===0){//normal attack
            attackHP = 20
        }else{ // SP_attack
           switch (this.state.monsterType) {

               case `Grass`:
                   // console.log("case grass!!!!!!!!!!!")
                   switch (this.state.enemyType) {
                       case `Grass`:
                           attackHP = 20;
                         break;
                       case `Fire`:
                           attackHP = 10;
                           break;
                       case `Electric`:
                           attackHP = 40;
                           break;
                       case `Water`:
                           attackHP = 20;
                           break;
                       case `Normal`:
                           attackHP = 20;
                           break;
                   }
                   break;
               case `Fire`:
                   switch (this.state.enemyType) {
                       case `Grass`:
                           attackHP = 40;
                           break;
                       case `Fire`:
                           attackHP = 20;
                           break;
                       case `Electric`:
                           attackHP = 20;
                           break;
                       case `Water`:
                           attackHP = 10;
                           break;
                       case `Normal`:
                           attackHP = 20;
                           break;
                   }
                   break;
               case `Electric`:
                   switch (this.state.enemyType) {
                       case `Grass`:
                           attackHP = 10;
                           break;
                       case `Fire`:
                           attackHP = 20;
                           break;
                       case `Electric`:
                           attackHP = 20;
                           break;
                       case `Water`:
                           attackHP = 40;
                           break;
                       case `Normal`:
                           attackHP = 20;
                           break;
                   }
                   break;
               case `Water`:
                   switch (this.state.enemyType) {
                       case `Grass`:
                           attackHP = 20;
                           break;
                       case `Fire`:
                           attackHP = 40;
                           break;
                       case `Electric`:
                           attackHP = 10;
                           break;
                       case `Water`:
                           attackHP = 20;
                           break;
                       case `Normal`:
                           attackHP = 20;
                           break;
                   }
                   break;
               case `Normal`:
                   switch (this.state.enemyType) {
                       case `Grass`:
                           attackHP = 20;
                           break;
                       case `Fire`:
                           attackHP = 20;
                           break;
                       case `Electric`:
                           attackHP = 40;
                           break;
                       case `Water`:
                           attackHP = 20;
                           break;
                       case `Normal`:
                           attackHP = 20;
                           break;
                   }
                   break;
               default:
                   console.log("No case!!!!!!!!!!");
           }
        }
        this.setState({
            enemyHP: this.state.enemyHP-attackHP
        });
        if(this.state.enemyHP<=0){
            this.setState({currentScore: this.state.currentScore+1});
            this.getEnemyInfo();
        }

    }
    switchMonster = ()=>{

        let monsters = this.state.monsterLeftArr;

        return monsters.map((monster) =>
            <li>
                <a
                    className=" waves-light  btn-small"
                    onClick={this.changeMonster.bind(this, monster)}
                >{monster}</a>
            </li>);
    };
    async updateUserInfo(monsterName,newHP){
        try{
            console.log("--------------",newHP,monsterName);
            const userInfo = await axios.put(`http://localhost:5000/users/5df185530cc23223101a8e5d}`,
                {
                    "newHP":newHP,
                    "monsterName":monsterName
                });
            console.log("here&&&&&&&&&&7"+userInfo)
            this.setState({
                    currentHP:newHP,
                }
            )
        }catch (e) {
            throw e;
        }
    };
    async getEnemyInfo(){

      try {
          let monsterName, monsterLocalInfo;
          while(true){
               monsterName = this.getRandomMonsterName();
               console.log("MMMMMMMMMMMMMMMMMMMMMM    "+monsterName);
               monsterLocalInfo = await axios.get(`http://localhost:5000/monsters/name/${monsterName}`);
               console.log("monsterLocalInfo88888888888888: ",monsterLocalInfo);
              if(monsterLocalInfo.data.HP>0) break;

          }

            this.setState({
                enemyImg: images[monsterName],
                enemyHP: monsterLocalInfo.data.HP,
                enemyType:monsterLocalInfo.data.Type
            });

            console.log("Game.js this.state after setSate in getEnemyInfo()")
            console.log(this.state)
      }  catch (e) {
          throw e;
      }
    };
    getRandomMonsterName(){
        let list = [ "Bulbasaur", "Charmander", "Electabuzz", "Growlithe", "Meowth", "Oddish", "Pikachu", "Psyduck", "Rattata", "Squirtle"];
        let index = Math.floor(Math.random()*(list.length-1));
        return list[index];
    }
    async getUserInfo(){
        try{
            // const userInfo = await axios.get(`http://localhost:5000/users/${this.props.auth_mongodb.userInfo._id}`);
            const userInfo = await axios.get(`http://localhost:5000/users/5df185530cc23223101a8e5d`);

            const allMonsters = userInfo.data.monster;

            let leftMonsters = [];
            for(let i=0;i<allMonsters.length;i++){
                if(allMonsters[i].HP>0){
                    leftMonsters.push(allMonsters[i].monsterName);
                }
            }
            this.setState({
                    userName: userInfo.data.userName,
                    monster: "null",
                    currentHP:0,
                    currentScore:userInfo.data.currentScore,
                    monsterLeftArr:leftMonsters,
                    bestScore: userInfo.data.bestScore
                }
            );
            return userInfo;
        }catch (e) {
            throw e;
        }
    };


    // Left Part
    ShowUserInfo = ()=> {

        return (
            <div className="card-panel pink lighten-5">
                <p>User:  {this.state.userName}</p>
                <p>Monster:  {this.state.monster}</p>
                <p>HP:  {this.state.currentHP}</p>
                <a className=" waves-light  btn-large" onClick={this.changeMonsterHP.bind(this,0)}> Attack </a>
                <br/>
                <a className=" waves-light btn-large" onClick={this.changeMonsterHP.bind(this,1)}>SP_Attack</a>
                <br/>
                Select one monster:
                { this.switchMonster()  }
                <ScoreBoard  currentScore={this.state.currentScore} />
            </div>
        );
    };
    ShowMonsterImg = ()=>{

        return (
                <img src={this.state.monsterImg} width="100" />
        )
    };
    // DoNothing = ()=>{
    //     this.setState({
    //
    //     })
    // }
    render() {

        return (
            <div className="row" >
                <div className="col s4" >
                    {this.ShowUserInfo()}
                </div>
                <div className="col s2">
                    <p>Your monster</p>
                    {this.ShowMonsterImg()}
                </div>
                <div className="col s2">
                    <p>Enemy monster</p>
                    <p>HP:   {this.state.enemyHP}</p>
                    <img src={this.state.enemyImg} width="100"/>
                </div>
                <div className="col s4">
                    <FightRecord battleMessage={this.state.battleMessage}/>
                </div>
            </div>
        )
    }
}

export default Game