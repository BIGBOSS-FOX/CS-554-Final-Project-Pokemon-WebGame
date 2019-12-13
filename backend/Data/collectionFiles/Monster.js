const { ObjectId } = require('mongodb');
// const bcrypt = require('bcrypt');
const mongoCollections = require('../collections');


const { User, Monster } = mongoCollections;

async function CreateMonster(_monsterName,_Type, _HP, _Attack, _SpAttack,_Picture){
    const monsterCollections = await Monster();

    const newMonster = {
        monsterName:_monsterName,
        Type:_Type,
        HP:_HP,
        Attack:_Attack,
        SpAttack:_SpAttack,
        Picture:_Picture
    };

    const insertInfo = await monsterCollections.insertOne(newMonster);
    if (insertInfo.insertedCount === 0) throw 'Could not add new monster';

    return newMonster;
}
async function GetMonsterById(_id){
    let newId = ObjectId(_id);
    const monsterCollections = await Monster();
    return await monsterCollections.findOne({_id: newId});
}
async function GetMonsterByName(_monsterName){
    const monsterCollections = await Monster();
    return await monsterCollections.findOne({monsterName:_monsterName});
}

module.exports = {
    CreateMonster,
    GetMonsterById,
    GetMonsterByName
};
